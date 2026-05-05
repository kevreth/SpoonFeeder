<template>
  <div v-if="modelValue" class="sc-panel">
    <div class="spoony-accent-top"></div>
    <div class="spoony-corner-tl"></div>
    <div class="spoony-corner-tr"></div>
    <div class="spoony-corner-bl"></div>
    <div class="spoony-corner-br"></div>

    <!-- Header -->
    <div class="sc-header">
      <div class="sc-header-left">
        <img :src="botSvg" class="sc-bot-img" alt="Spoony" />
        <span class="sc-title">{{ $t('spoony.title') }}</span>
      </div>
      <div class="sc-header-right">
        <q-btn
          flat
          dense
          icon="delete_outline"
          class="sc-icon-btn"
          aria-label="Clear chat history"
          @click="clearChat"
        />
        <q-btn
          flat
          dense
          icon="remove"
          class="sc-icon-btn"
          aria-label="Minimize chat"
          @click="closeDialog"
        />
      </div>
    </div>

    <!-- Messages -->
    <div class="sc-messages" ref="messagesEl">
      <div v-if="messages.length === 0 && !isTyping" class="sc-empty">
        Ask me anything about this course.
      </div>
      <template v-else>
        <template v-for="(msg, i) in messages" :key="i">
          <div v-if="msg.role === 'user'" class="sc-msg-user">
            {{ msg.content }}
          </div>
          <div v-else class="sc-spoony-row">
            <div class="sc-sender-label">Spoony</div>
            <div class="sc-msg-spoony">
              <div v-html="renderMarkdown(msg.content)"></div>
              <button
                v-if="msg.errorType === SpoonyErrorType.NETWORK_ERROR"
                class="sc-retry-btn"
                @click="retryLastMessage"
              >
                Retry
              </button>
              <button
                v-if="msg.errorType === SpoonyErrorType.UNAVAILABLE"
                class="sc-close-btn"
                @click="emit('update:modelValue', false)"
              >
                Close
              </button>
            </div>
          </div>
        </template>
        <div v-if="isTyping" class="sc-spoony-row">
          <div class="sc-sender-label">Spoony</div>
          <div class="sc-msg-spoony sc-typing">{{ $t('spoony.typing') }}</div>
        </div>
      </template>
    </div>

    <!-- Input -->
    <div class="sc-input-area">
      <div class="sc-input-wrap">
        <div v-if="isRateLimited" class="sc-rate-limit-msg">
          Please wait {{ rateLimitCountdown }}s before sending again
        </div>
        <q-input
          v-model="userInput"
          borderless
          dark
          :placeholder="$t('spoony.input_placeholder')"
          maxlength="500"
          autogrow
          class="sc-q-input"
          @keydown.enter.exact.prevent="onSendMessage"
        />
      </div>
      <q-btn
        flat
        dense
        icon="send"
        class="sc-send-btn"
        aria-label="Send message"
        :disable="isSendDisabled"
        @click="onSendMessage"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import botSvg from 'src/img/bot.svg';
import type { SpoonyMessage } from '../../../ts/main/spoony/spoony.types';
import { SPOONY_DEFAULT_MODEL } from '../../../ts/main/spoony/spoony.types';
import {
  SPOONY_API_KEY,
  SPOONY_MODEL,
} from '../../../ts/main/spoony/spoonyStorage';
import {
  SpoonyErrorType,
  sendMessage as apiSendMessage,
} from '../../../ts/main/spoony/spoonyApi';
import type { SpoonyContext } from '../../../ts/main/spoony/spoonyApi';
import { COURSE_NAME } from '../../../ts/main/dataaccess/index';

type ChatMessage = SpoonyMessage & { errorType?: SpoonyErrorType };

const props = defineProps<{ modelValue: boolean }>();
const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  'open-setup': [];
}>();

const { t } = useI18n();

const userInput = ref('');
const isTyping = ref(false);
const messages = ref<ChatMessage[]>([]);
const messagesEl = ref<HTMLElement | null>(null);
const lastUserMessage = ref('');
const rateLimitedUntil = ref<number>(0);
const rateLimitCountdown = ref(0);
let rateLimitInterval: ReturnType<typeof setInterval> | null = null;

const isRateLimited = computed(() => rateLimitCountdown.value > 0);
const isSendDisabled = computed(
  () => isTyping.value || !userInput.value.trim() || isRateLimited.value,
);

function startRateLimitCountdown() {
  rateLimitCountdown.value = Math.ceil(
    (rateLimitedUntil.value - Date.now()) / 1000,
  );
  if (rateLimitInterval) clearInterval(rateLimitInterval);
  rateLimitInterval = setInterval(() => {
    const remaining = Math.ceil((rateLimitedUntil.value - Date.now()) / 1000);
    if (remaining <= 0) {
      rateLimitCountdown.value = 0;
      clearInterval(rateLimitInterval!);
      rateLimitInterval = null;
    } else {
      rateLimitCountdown.value = remaining;
    }
  }, 1000);
}

function getCurrentContext(): SpoonyContext {
  const contentEl = document.querySelector('#content') as HTMLElement | null;
  const slideEl = document.querySelector('#slide') as HTMLElement | null;
  const wrapEl = document.querySelector('.wrapContent') as HTMLElement | null;

  const slideText =
    contentEl?.innerText?.trim() ||
    slideEl?.innerText?.trim() ||
    wrapEl?.innerText?.trim() ||
    '';

  return {
    courseName: COURSE_NAME.get() ?? 'Unknown Course',
    unitName: '',
    lessonName: '',
    slideText,
  };
}

function scrollToBottom() {
  nextTick(() => {
    if (messagesEl.value) {
      messagesEl.value.scrollTop = messagesEl.value.scrollHeight;
    }
  });
}

async function sendText(text: string) {
  if (messages.value.length >= 50) {
    messages.value.splice(0, 2);
  }

  messages.value.push({ role: 'user', content: text, timestamp: Date.now() });
  userInput.value = '';
  isTyping.value = true;
  scrollToBottom();

  const history = messages.value.slice(-5, -1); // last 4 messages before current
  const result = await apiSendMessage({
    apiKey: SPOONY_API_KEY.get() ?? '',
    model: SPOONY_MODEL.get() ?? SPOONY_DEFAULT_MODEL,
    context: getCurrentContext(),
    history,
    userMessage: text,
  });

  isTyping.value = false;

  if (result.success) {
    messages.value.push({
      role: 'assistant',
      content: result.content,
      timestamp: Date.now(),
    });
  } else {
    const errorMessages: Record<SpoonyErrorType, string> = {
      [SpoonyErrorType.INVALID_KEY]: t('spoony.error_invalid_key'),
      [SpoonyErrorType.RATE_LIMITED]: t('spoony.error_rate_limited'),
      [SpoonyErrorType.NETWORK_ERROR]: t('spoony.error_network'),
      [SpoonyErrorType.UNAVAILABLE]: t('spoony.error_unavailable'),
    };
    messages.value.push({
      role: 'assistant',
      content: errorMessages[result.error],
      timestamp: Date.now(),
      errorType: result.error,
    });

    if (result.error === SpoonyErrorType.INVALID_KEY) {
      await nextTick();
      emit('update:modelValue', false);
      emit('open-setup');
    } else if (result.error === SpoonyErrorType.RATE_LIMITED) {
      rateLimitedUntil.value = Date.now() + 60000;
      startRateLimitCountdown();
    }
  }

  scrollToBottom();
}

async function onSendMessage() {
  const text = userInput.value.trim();
  if (!text || isTyping.value) return;
  lastUserMessage.value = text;
  await sendText(text);
}

async function retryLastMessage() {
  if (!lastUserMessage.value || isTyping.value) return;
  await sendText(lastUserMessage.value);
}

function renderMarkdown(content: string): string {
  return content.replace(
    /\*\*(.*?)\*\*/g,
    '<strong style="color:#4df5ff;font-weight:500">$1</strong>',
  );
}

function clearChat() {
  messages.value = [];
}

function closeDialog() {
  emit('update:modelValue', false);
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') emit('update:modelValue', false);
}

onMounted(() => document.addEventListener('keydown', onKeydown));
onUnmounted(() => document.removeEventListener('keydown', onKeydown));
</script>

<style scoped>
.sc-panel {
  position: fixed;
  bottom: 20px;
  right: 5px;
  width: 380px;
  min-width: 300px;
  max-width: 600px;
  height: 80vh;
  /* max-height: 600px; */
  z-index: 9999;
  background: var(--spoony-bg);
  border: 1px solid rgba(0, 229, 255, 0.25);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Override shared corner size for the larger chat panel */
.spoony-corner-tl,
.spoony-corner-tr,
.spoony-corner-bl,
.spoony-corner-br {
  width: 22px;
  height: 22px;
}

/* Header */
.sc-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  border-bottom: 1px solid rgba(0, 229, 255, 0.1);
  flex-shrink: 0;
}

.sc-header-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.sc-bot-img {
  width: 20px;
  height: 20px;
}

.sc-title {
  font-size: 13px;
  color: var(--spoony-cyan);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  font-family: 'Orbitron', sans-serif;
  font-weight: 500;
}

.sc-header-right {
  display: flex;
  align-items: center;
  gap: 4px;
}

.sc-icon-btn {
  color: rgba(0, 229, 255, 0.5) !important;
}

.sc-icon-btn:hover {
  color: var(--spoony-cyan) !important;
}

/* Messages */
.sc-messages {
  flex: 1;
  overflow-y: auto;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.sc-messages::-webkit-scrollbar {
  width: 4px;
}
.sc-messages::-webkit-scrollbar-track {
  background: transparent;
}
.sc-messages::-webkit-scrollbar-thumb {
  background: rgba(0, 229, 255, 0.2);
  border-radius: 2px;
}
.sc-messages::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 229, 255, 0.4);
}

.sc-empty {
  margin: auto;
  color: rgba(255, 255, 255, 0.3);
  font-size: 13px;
  text-align: center;
}

.sc-msg-user {
  align-self: flex-end;
  background: rgba(0, 140, 255, 0.15);
  border: 1px solid rgba(0, 140, 255, 0.3);
  border-radius: 12px 12px 2px 12px;
  padding: 8px 12px;
  max-width: 80%;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.9);
  white-space: pre-wrap;
  word-break: break-word;
}

.sc-spoony-row {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.sc-sender-label {
  font-size: 10px;
  color: rgba(0, 229, 255, 0.5);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding-left: 2px;
  margin-bottom: 3px;
}

.sc-msg-spoony {
  background: rgba(13, 21, 38, 0.9);
  border: 1px solid rgba(0, 229, 255, 0.2);
  border-radius: 2px 10px 10px 10px;
  padding: 8px 12px;
  max-width: 80%;
  font-size: 14px;
  color: #e8f0ff;
  text-align: left;
  white-space: pre-wrap;
  word-break: break-word;
}

.sc-typing {
  color: rgba(255, 255, 255, 0.4);
}

/* Input */
.sc-input-area {
  display: flex;
  align-items: flex-end;
  gap: 4px;
  border-top: 1px solid rgba(0, 229, 255, 0.1);
  padding: 10px 16px;
  flex-shrink: 0;
}

.sc-input-wrap {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.sc-q-input {
  background: transparent;
}

.sc-q-input :deep(.q-field__native) {
  color: rgba(255, 255, 255, 0.85);
  font-size: 15px;
  max-height: calc(3 * 1.4em + 8px);
  overflow-y: auto;
  resize: none;
}

.sc-q-input :deep(.q-field__native::placeholder) {
  color: rgba(255, 255, 255, 0.25);
}

.sc-send-btn {
  color: var(--spoony-cyan) !important;
  flex-shrink: 0;
}

.sc-send-btn.disabled,
.sc-send-btn[disabled] {
  color: rgba(0, 229, 255, 0.25) !important;
}

.sc-retry-btn,
.sc-close-btn {
  background: transparent;
  border: 1px solid rgba(0, 229, 255, 0.4);
  border-radius: 3px;
  color: #4df5ff;
  font-size: 11px;
  padding: 3px 10px;
  margin-top: 6px;
  cursor: pointer;
  letter-spacing: 0.05em;
}

.sc-rate-limit-msg {
  font-size: 11px;
  color: rgba(255, 100, 100, 0.7);
  text-align: center;
  padding: 4px 0;
}
</style>
