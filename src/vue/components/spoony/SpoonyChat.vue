<template>
  <div v-if="modelValue" class="sc-panel">
    <div class="sc-top-accent"></div>
    <div class="corner-tl"></div>
    <div class="corner-tr"></div>
    <div class="corner-bl"></div>
    <div class="corner-br"></div>

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
          @click="clearChat"
        />
        <q-btn
          flat
          dense
          icon="remove"
          class="sc-icon-btn"
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
            <div
              class="sc-msg-spoony"
              v-html="renderMarkdown(msg.content)"
            ></div>
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
      <q-btn
        flat
        dense
        icon="send"
        class="sc-send-btn"
        :disable="!userInput.trim() || isTyping"
        @click="onSendMessage"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';
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

const props = defineProps<{ modelValue: boolean }>();
const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>();

const { t } = useI18n();

const userInput = ref('');
const isTyping = ref(false);
const messages = ref<SpoonyMessage[]>([]);
const messagesEl = ref<HTMLElement | null>(null);

function getCurrentContext(): SpoonyContext {
  const slideText =
    document.querySelector('.slide-content')?.innerText ||
    document.querySelector('#slide-content')?.innerText ||
    document.querySelector('.wrapContent')?.innerText ||
    document.querySelector('main')?.innerText ||
    '';
  const context: SpoonyContext = {
    courseName: COURSE_NAME.get() ?? 'Unknown Course',
    unitName: '',
    lessonName: '',
    slideText,
  };
  console.log('[SpoonyChat] context:', context);
  return context;
}

function scrollToBottom() {
  nextTick(() => {
    if (messagesEl.value) {
      messagesEl.value.scrollTop = messagesEl.value.scrollHeight;
    }
  });
}

async function onSendMessage() {
  const text = userInput.value.trim();
  if (!text || isTyping.value) return;

  if (messages.value.length >= 50) {
    messages.value.splice(0, 2);
  }

  messages.value.push({ role: 'user', content: text, timestamp: Date.now() });
  userInput.value = '';
  isTyping.value = true;
  scrollToBottom();

  const history = messages.value.slice(0, -1);
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
    const errorMap: Record<SpoonyErrorType, string> = {
      [SpoonyErrorType.INVALID_KEY]: t('spoony.error_invalid_key'),
      [SpoonyErrorType.RATE_LIMITED]: t('spoony.error_rate_limited'),
      [SpoonyErrorType.NETWORK_ERROR]: t('spoony.error_network'),
      [SpoonyErrorType.UNAVAILABLE]: t('spoony.error_unavailable'),
    };
    messages.value.push({
      role: 'assistant',
      content: errorMap[result.error],
      timestamp: Date.now(),
    });
  }

  scrollToBottom();
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
</script>

<style>
.sc-panel {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 300px;
  height: 520px;
  z-index: 9999;
  background: rgba(8, 14, 30, 0.97);
  border: 1px solid rgba(0, 229, 255, 0.25);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.sc-top-accent {
  height: 2px;
  background: linear-gradient(90deg, transparent, #00e5ff, transparent);
  flex-shrink: 0;
}

/* Corner brackets */
.sc-panel .corner-tl,
.sc-panel .corner-tr,
.sc-panel .corner-bl,
.sc-panel .corner-br {
  position: absolute;
  width: 22px;
  height: 22px;
  border-color: #00e5ff;
  border-style: solid;
  z-index: 2;
}
.sc-panel .corner-tl {
  top: 2px;
  left: 2px;
  border-width: 2px 0 0 2px;
}
.sc-panel .corner-tr {
  top: 2px;
  right: 2px;
  border-width: 2px 2px 0 0;
}
.sc-panel .corner-bl {
  bottom: 2px;
  left: 2px;
  border-width: 0 0 2px 2px;
}
.sc-panel .corner-br {
  bottom: 2px;
  right: 2px;
  border-width: 0 2px 2px 0;
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
  color: #00e5ff;
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
  color: #00e5ff !important;
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

.sc-q-input {
  flex: 1;
  background: transparent;
}

.sc-q-input .q-field__native {
  color: rgba(255, 255, 255, 0.85);
  font-size: 15px;
  max-height: calc(3 * 1.4em + 8px);
  overflow-y: auto;
  resize: none;
}

.sc-q-input .q-field__native::placeholder {
  color: rgba(255, 255, 255, 0.25);
}

.sc-send-btn {
  color: #00e5ff !important;
  flex-shrink: 0;
}

.sc-send-btn.disabled,
.sc-send-btn[disabled] {
  color: rgba(0, 229, 255, 0.25) !important;
}

@media (min-width: 768px) {
  .sc-panel {
    width: 480px;
    height: 620px;
  }
}
</style>
