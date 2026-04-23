<template>
  <q-dialog
    v-model="show"
    :z-index="3"
    backdrop-filter="blur(4px)"
    backdrop-color="rgba(0,0,0,0.85)"
    @click.stop=""
  >
    <div class="ss-card">
      <div class="ss-top-accent"></div>
      <div class="corner-tl"></div>
      <div class="corner-tr"></div>
      <div class="corner-bl"></div>
      <div class="corner-br"></div>

      <!-- Header -->
      <div class="ss-header">
        <div class="ss-bot-circle">
          <img :src="botSvg" class="ss-bot-img" alt="Spoony" />
        </div>
        <div class="ss-title">Activate Spoony</div>
        <div class="ss-divider"></div>
      </div>

      <!-- Body -->
      <div class="ss-body">
        <!-- Description box -->
        <div class="ss-desc-box">
          <span
            class="ss-desc-text"
            v-html="$t('spoony.setup_description')"
          ></span>
        </div>

        <!-- Step 1 -->
        <div class="ss-step-row">
          <div class="ss-step-num">1</div>
          <div>
            <a
              href="https://enter.pollinations.ai"
              target="_blank"
              rel="noopener noreferrer"
              class="ss-link"
              >Go to enter.pollinations.ai ↗</a
            >
            <div class="ss-step-note">
              Sign in → scroll down to Keys → click '+ API Key' → copy the sk_ key
            </div>
          </div>
        </div>

        <!-- Step 2 -->
        <div class="ss-step-row">
          <div class="ss-step-num">2</div>
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
                placeholder="pk_················"
                borderless
                dense
                class="ss-q-input"
                @update:model-value="keyError = false"
              />
            </div>
            <div class="ss-error">
              {{ keyError ? 'Key must start with sk_' : '' }}
            </div>
          </div>
        </div>

        <!-- Buttons -->
        <div class="ss-actions">
          <button class="ss-btn-cancel" @click="closeDialog">Cancel</button>
          <button class="ss-btn-activate" @click="saveKey">Activate ▶</button>
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

watch(apiKey, () => {
  keyError.value = false;
});

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

<style>
.ss-card {
  position: relative;
  background: rgba(4, 8, 20, 0.98);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(0, 229, 255, 0.2);
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
}

.ss-bot-img {
  width: 30px;
  height: 30px;
}

.ss-title {
  font-size: 15px;
  letter-spacing: 0.2em;
  /* color: #00e5ff; */
  font-weight: 500;
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
  background: rgba(0, 229, 255, 0.04);
  border: 1px solid rgba(0, 229, 255, 0.1);
  border-radius: 4px;
  padding: 12px 16px;
  margin-bottom: 20px;
  text-align: left;
}

.ss-desc-text {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.6;
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
  background: rgba(0, 229, 255, 0.15);
  border: 1px solid rgba(0, 229, 255, 0.4);
  font-size: 10px;
  color: #00e5ff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 1px;
}

.ss-step-note {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.4);
  margin-top: 6px;
  line-height: 1.5;
}

.ss-link {
  font-size: 13px;
  color: #00e5ff;
  text-decoration: none;
  border-bottom: 1px solid rgba(0, 229, 255, 0.3);
  line-height: 1.4;
  text-align: left;
}

.ss-link:hover {
  border-bottom-color: #00e5ff;
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
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 6px;
}

.ss-input-row {
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1.5px solid rgba(0, 229, 255, 0.4);
}

.ss-lock-icon {
  width: 13px;
  height: 13px;
  fill: rgba(0, 229, 255, 0.5);
  flex-shrink: 0;
}

.ss-q-input {
  flex: 1;
  background: transparent !important;
}

.ss-q-input .q-field__native {
  color: rgba(255, 255, 255, 0.85) !important;
  font-size: 13px !important;
  padding: 4px 0 !important;
}

.ss-q-input .q-field__native::placeholder {
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
  color: rgba(255, 255, 255, 0.4);
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
}

.ss-btn-cancel:hover {
  border-color: rgba(255, 255, 255, 0.3);
  color: rgba(255, 255, 255, 0.6);
}

.ss-btn-activate {
  background: rgba(0, 229, 255, 0.15);
  border: 1px solid rgba(0, 229, 255, 0.6);
  border-radius: 3px;
  padding: 8px 24px;
  color: #00e5ff;
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 500;
  cursor: pointer;
}

.ss-btn-activate:hover {
  background: rgba(0, 229, 255, 0.25);
}
</style>
