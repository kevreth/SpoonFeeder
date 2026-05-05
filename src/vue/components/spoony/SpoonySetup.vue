<template>
  <q-dialog
    v-model="show"
    :z-index="3"
    backdrop-filter="blur(4px)"
    backdrop-color="rgba(0,0,0,0.85)"
    @click.stop=""
  >
    <div class="ss-card">
      <div class="spoony-accent-top"></div>
      <div class="spoony-corner-tl"></div>
      <div class="spoony-corner-tr"></div>
      <div class="spoony-corner-bl"></div>
      <div class="spoony-corner-br"></div>

      <!-- Header -->
      <div class="ss-header">
        <div class="ss-bot-circle">
          <img :src="botSvg" class="ss-bot-img" alt="Spoony" />
        </div>
        <div class="ss-title">{{ $t('spoony.setup_title') }}</div>
        <div class="ss-divider"></div>
      </div>

      <!-- Body -->
      <div class="ss-body">
        <!-- Description box -->
        <div class="ss-desc-box">
          <span class="ss-desc-text">{{ $t('spoony.oauth_description') }}</span>
        </div>

        <!-- OAuth button -->
        <button
          class="ss-btn-oauth"
          aria-label="Authorize Spoony with Pollinations"
          @click="redirectToOAuth"
        >
          {{ $t('spoony.oauth_btn') }} ↗
        </button>

        <!-- Manual key toggle -->
        <div class="ss-manual-toggle">
          <button class="ss-btn-toggle" @click="showManual = !showManual">
            {{ $t('spoony.manual_key_toggle') }}
          </button>
        </div>

        <!-- Manual key input (hidden by default) -->
        <div v-if="showManual" class="ss-manual-section">
          <div class="ss-manual-guide">
            <div class="ss-note-row">
              <span class="ss-note-n">1.</span
              ><span
                >Go to
                <a
                  href="https://enter.pollinations.ai"
                  target="_blank"
                  class="ss-link"
                  >enter.pollinations.ai ↗</a
                ></span
              >
            </div>
            <div class="ss-note-row">
              <span class="ss-note-n">2.</span><span>Sign in with GitHub</span>
            </div>
            <div class="ss-note-row">
              <span class="ss-note-n">3.</span
              ><span>Go to the <strong>Keys</strong> section in the menu</span>
            </div>
            <div class="ss-note-row">
              <span class="ss-note-n">4.</span
              ><span>Click <strong>+ API Key</strong></span>
            </div>
            <div class="ss-note-row">
              <span class="ss-note-n">5.</span
              ><span>Copy the key and paste it below</span>
            </div>
          </div>
          <div class="ss-input-area">
            <div class="ss-input-label">Paste your key below</div>
            <div class="ss-input-row">
              <svg
                class="ss-lock-icon"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"
                />
              </svg>
              <q-input
                v-model="apiKey"
                type="password"
                placeholder="sk_················"
                borderless
                dense
                class="ss-q-input"
                aria-label="API key input"
                @update:model-value="keyError = false"
              />
            </div>
            <div class="ss-error">
              {{ keyError ? 'Key must start with sk_' : '' }}
            </div>
          </div>
          <div class="ss-actions">
            <button
              class="ss-btn-cancel"
              aria-label="Cancel setup"
              @click="closeDialog"
            >
              Cancel
            </button>
            <button
              class="ss-btn-activate"
              aria-label="Save API key"
              @click="saveKey"
            >
              Activate ▶
            </button>
          </div>
        </div>

        <!-- Cancel button when manual section is hidden -->
        <div v-if="!showManual" class="ss-actions">
          <button
            class="ss-btn-cancel"
            aria-label="Cancel setup"
            @click="closeDialog"
          >
            Cancel
          </button>
        </div>
      </div>

      <div class="ss-bottom-accent"></div>
    </div>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import botSvg from 'src/img/bot.svg';
import { SPOONY_API_KEY } from '../../../ts/main/spoony/index';

const props = defineProps<{ modelValue: boolean }>();
const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  saved: [];
}>();

const show = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
});

const apiKey = ref('');
const keyError = ref(false);
const showManual = ref(false);

watch(apiKey, () => {
  keyError.value = false;
});

function redirectToOAuth() {
  const redirectUri = window.location.origin + window.location.pathname;
  const authUrl = `https://enter.pollinations.ai/authorize?redirect_uri=${encodeURIComponent(redirectUri)}`;
  window.location.href = authUrl;
}

function saveKey() {
  if (!apiKey.value.startsWith('sk_')) {
    keyError.value = true;
    return;
  }
  SPOONY_API_KEY.set(apiKey.value);
  emit('saved');
  emit('update:modelValue', false);
}

function closeDialog() {
  emit('update:modelValue', false);
}
</script>

<style scoped>
.ss-card {
  position: relative;
  background: #0d1526;
  backdrop-filter: blur(4px);
  border: 1px solid var(--spoony-cyan-dim);
  border-radius: 4px;
  min-width: 340px;
  max-width: 420px;
  overflow: hidden;
}

.ss-header {
  padding: 28px 32px 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.ss-bot-circle {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: rgba(0, 229, 255, 0.08);
  border: 1.5px solid rgba(0, 229, 255, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0 0 6px rgba(77, 245, 255, 0.3));
}

.ss-bot-img {
  width: 30px;
  height: 30px;
  filter: brightness(0) saturate(100%) invert(88%) sepia(61%) saturate(400%)
    hue-rotate(155deg) brightness(105%);
}

.ss-title {
  font-size: 15px;
  letter-spacing: 0.2em;
  /* color: #4df5ff; */
  color: var(--spoony-text);

  font-weight: bold;
  text-transform: uppercase;
  font-family: 'Orbitron', sans-serif;
}

.ss-divider {
  width: 40px;
  height: 1px;
  background: rgba(0, 229, 255, 0.3);
}

/* Body */
.ss-body {
  padding: 0 32px 28px;
}

.ss-desc-box {
  background: rgba(255, 255, 255, 0.05);
  border-left: 2px solid rgba(0, 229, 255, 0.4);
  border-radius: 0 4px 4px 0;
  padding: 12px 16px;
  margin-bottom: 20px;
  text-align: left;
}

.ss-desc-text {
  font-size: 12px;
  color: var(--spoony-text);
  line-height: 1.6;
}

.ss-btn-oauth {
  width: 100%;
  background: rgba(0, 229, 255, 0.15);
  border: 1.5px solid rgba(0, 229, 255, 0.8);
  border-radius: 4px;
  padding: 12px 20px;
  color: var(--spoony-cyan);
  font-size: 13px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 16px;
  transition: background 0.15s;
}

.ss-btn-oauth:hover {
  background: rgba(0, 229, 255, 0.25);
}

.ss-manual-toggle {
  text-align: center;
  margin-bottom: 12px;
}

.ss-btn-toggle {
  background: transparent;
  border: none;
  color: rgba(200, 220, 255, 0.45);
  font-size: 11px;
  letter-spacing: 0.05em;
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 2px;
  padding: 0;
}

.ss-btn-toggle:hover {
  color: rgba(200, 220, 255, 0.75);
}

.ss-manual-section {
  margin-top: 4px;
}

.ss-step-row {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  margin-bottom: 16px;
}

.ss-step-num {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgba(0, 229, 255, 0.2);
  border: 1px solid rgba(0, 229, 255, 0.6);
  font-size: 10px;
  color: var(--spoony-cyan);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 1px;
}

.ss-step-note {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 6px;
}

.ss-note-row {
  font-size: 12px;
  color: rgba(200, 220, 255, 0.7);
  display: flex;
  gap: 6px;
  align-items: baseline;
}

.ss-note-n {
  color: #4df5ff;
  font-weight: 600;
  font-size: 11px;
  min-width: 14px;
}

.ss-manual-guide {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 12px;
}

.ss-manual-guide strong {
  color: #4df5ff;
  font-weight: 500;
}

.ss-step-note strong {
  color: var(--spoony-cyan);
  font-weight: 500;
}

.ss-link {
  font-size: 13px;
  color: var(--spoony-cyan);
  text-decoration: none;
  border-bottom: 1px solid rgba(77, 245, 255, 0.4);
  line-height: 1.4;
  text-align: left;
}

.ss-link:hover {
  border-bottom-color: #4df5ff;
}

.ss-input-area {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.ss-input-label {
  display: block;
  width: 100%;
  text-align: left;
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 6px;
  color: var(--spoony-text);
}

.ss-input-row {
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1.5px solid rgba(0, 229, 255, 0.5);
}

.ss-lock-icon {
  width: 13px;
  height: 13px;
  fill: #4df5ff;
  flex-shrink: 0;
}

.ss-q-input {
  flex: 1;
  background: transparent !important;
}

.ss-q-input :deep(.q-field__native) {
  color: var(--spoony-text) !important;
  font-size: 13px !important;
  padding: 4px 0 !important;
}

.ss-q-input :deep(.q-field__native::placeholder) {
  color: rgba(255, 255, 255, 0.2) !important;
  letter-spacing: 0.05em;
}

.ss-error {
  font-size: 11px;
  color: rgba(255, 100, 100, 0.8);
  min-height: 16px;
  margin-top: 4px;
}

/* Buttons */
.ss-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 20px;
}

.ss-btn-cancel {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 3px;
  padding: 8px 20px;
  color: rgba(200, 220, 255, 0.5);
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
}

.ss-btn-cancel:hover {
  border-color: rgba(255, 255, 255, 0.3);
  color: rgba(200, 220, 255, 0.8);
}

.ss-btn-activate {
  background: rgba(0, 229, 255, 0.2);
  border: 1px solid rgba(0, 229, 255, 0.8);
  border-radius: 3px;
  padding: 8px 24px;
  color: var(--spoony-cyan);
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 500;
  cursor: pointer;
}

.ss-btn-activate:hover {
  background: rgba(0, 229, 255, 0.3);
}

@media (min-width: 768px) {
  .ss-title {
    font-size: 16px;
  }
  .ss-link,
  .ss-desc-text {
    font-size: 14px;
  }
  .ss-input-label {
    font-size: 13px;
  }
  .ss-step-note {
    font-size: 12px;
  }
}
</style>
