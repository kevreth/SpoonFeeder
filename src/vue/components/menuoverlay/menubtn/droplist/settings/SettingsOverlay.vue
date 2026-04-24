<template>
  <q-dialog
    v-model="showOverlay"
    class="settingOverlay"
    :z-index="3"
    @click.stop=""
  >
    <!-- <template #body> -->
    <div class="settings fixed-center bg-secondary">
      <div class="corner-tl"></div>
      <div class="corner-tr"></div>
      <div class="corner-bl"></div>
      <div class="corner-br"></div>
      <div class="q-pa-sm title-row">{{ $t('settingsContent.title') }}</div>
      <q-separator horizontal class="q-mx-sm bg-white" />
      <div class="lang-row">
        <span class="lang-label">
          <span style="font-size: 16px; opacity: 0.6; margin-right: 8px"
            >🌐</span
          >{{ $t('settingsContent.language') }}
        </span>
        <SwitchLang class="q-ma-sm"></SwitchLang>
      </div>

      <!-- Spoony inset card -->
      <div class="spoony-card">
        <!-- Card header -->
        <div class="spoony-card-header">
          <span class="spoony-card-title">
            <span style="font-size: 14px; margin-right: 6px">🤖</span>SPOONY AI
          </span>
          <span class="spoony-card-status">
            <span
              :class="apiKeySaved ? 'spoony-dot-green' : 'spoony-dot-red'"
            ></span>
            {{ apiKeySaved ? 'Active' : 'No Key' }}
          </span>
        </div>

        <!-- API Key row -->
        <div class="spoony-card-row">
          <span class="spoony-field-label">API Key</span>
          <div class="spoony-btn-group">
            <q-btn dense flat size="sm" @click="showKeySetup = true">{{
              $t('spoony.settings_update_key')
            }}</q-btn>
            <q-btn
              flat
              dense
              label="Delete Key"
              class="spoony-btn-delete"
              @click="deleteKey"
            />
          </div>
        </div>

        <!-- Model row -->
        <div class="spoony-card-row spoony-model-row">
          <span class="spoony-field-label">AI Model</span>
          <div class="spoony-model-dropdown">
            <div
              class="spoony-model-trigger"
              @click="showModelMenu = !showModelMenu"
            >
              <span>{{ currentModelLabel }}</span>
              <span class="spoony-model-arrow">▾</span>
            </div>
            <div v-if="showModelMenu" class="spoony-model-menu">
              <div
                v-for="m in modelOptions"
                :key="m.value"
                class="spoony-model-item"
                :class="{ active: selectedModel === m.value }"
                @click="selectModel(m.value)"
              >
                {{ m.label }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ExitBtn @click="closeInfo" />
    </div>
    <SpoonySetup v-model="showKeySetup" @saved="onKeySaved" />
    <!-- </template> -->
  </q-dialog>
</template>

<script setup lang="ts">
import ExitBtn from '../../../../common/ExitBtn.vue';
import { ref, computed } from 'vue';
import SwitchLang from './switchlanguages/SwitchLang.vue';
import SpoonySetup from '../../../../spoony/SpoonySetup.vue';
import {
  SPOONY_API_KEY,
  SPOONY_MODEL,
} from '../../../../../../ts/main/spoony/spoonyStorage';
import {
  SPOONY_MODELS,
  SPOONY_DEFAULT_MODEL,
} from '../../../../../../ts/main/spoony/spoony.types';

const showOverlay = ref(true);
const showKeySetup = ref(false);
const showModelMenu = ref(false);
const _keyVersion = ref(0);

const apiKeySaved = computed(() => {
  void _keyVersion.value;
  return SPOONY_API_KEY.get() !== null;
});

const selectedModel = ref(SPOONY_MODEL.get() ?? SPOONY_DEFAULT_MODEL);

const modelOptions = SPOONY_MODELS.map((m) => ({
  label: m.label,
  value: m.id,
}));

const currentModelLabel = computed(
  () => modelOptions.find((m) => m.value === selectedModel.value)?.label,
);

function deleteKey() {
  SPOONY_API_KEY.remove();
  _keyVersion.value++;
}

function selectModel(val: string) {
  selectedModel.value = val;
  SPOONY_MODEL.set(val);
  showModelMenu.value = false;
}

function onKeySaved() {
  showKeySetup.value = false;
  _keyVersion.value++;
}

const emit = defineEmits(['closeInfo']);
function closeInfo() {
  emit('closeInfo');
  showOverlay.value = false;
}
</script>

<style>
.q-btn .settingOverlay {
  line-height: 1rem !important;
  font-weight: 900;
}
.settings {
  background: rgba(8, 12, 28, 0.95) !important;
  border-radius: 10px !important;
  border: none !important;
  box-shadow: none !important;
  padding: 20px !important;
  min-width: 360px;
  margin: 0;
  font-size: 1rem;
  overflow: visible !important;
}
.settingOverlay .q-dialog__inner {
  overflow: visible !important;
}
.corner-tl,
.corner-tr,
.corner-bl,
.corner-br {
  position: absolute;
  width: 16px;
  height: 16px;
  border-color: #00e5ff;
  border-style: solid;
  z-index: 2;
}
.corner-tl {
  top: 2px;
  left: 2px;
  border-width: 2px 0 0 2px;
}
.corner-tr {
  top: 2px;
  right: 2px;
  border-width: 2px 2px 0 0;
}
.corner-bl {
  bottom: 2px;
  left: 2px;
  border-width: 0 0 2px 2px;
}
.corner-br {
  bottom: 2px;
  right: 2px;
  border-width: 0 2px 2px 0;
}
.settings .title-row {
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  padding-bottom: 12px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}
.settings .q-separator {
  background: rgba(0, 229, 255, 0.25) !important;
  margin-bottom: 14px;
}
.settings .lang-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  margin-bottom: 14px;
}
.settings .lang-row .lang-label {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.75);
}
.settings .q-btn {
  background: transparent !important;
  border: 1.5px solid rgba(0, 229, 255, 0.5) !important;
  color: #00e5ff !important;
  border-radius: 6px !important;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.spoony-card {
  background: rgba(0, 229, 255, 0.03);
  border: 1px solid rgba(0, 229, 255, 0.12);
  border-radius: 4px;
  padding: 10px 12px;
  margin-bottom: 10px;
}
.spoony-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}
.spoony-card-title {
  display: flex;
  align-items: center;
  font-size: 12px;
  /* color: #4df5ff; */
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.spoony-card-status {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  color: rgba(0, 229, 255, 0.6);
}
.spoony-card-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 6px;
}
.spoony-model-row {
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding-top: 8px;
  margin-top: 4px;
}
.spoony-field-label {
  font-size: 12px;
}
.spoony-btn-group {
  display: flex;
  gap: 6px;
}
.spoony-dot-green,
.spoony-dot-red {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  display: inline-block;
  flex-shrink: 0;
}
.spoony-dot-green {
  background: #00e5a0;
}
.spoony-dot-red {
  background: rgba(255, 100, 100, 0.8);
}
.spoony-btn-delete {
  border: 1px solid rgba(255, 80, 80, 0.5) !important;
  border-radius: 3px !important;
  color: rgba(255, 100, 100, 0.85) !important;
  font-size: 10px !important;
  padding: 3px 8px !important;
  letter-spacing: 0.08em !important;
  text-transform: uppercase !important;
}
.spoony-btn-delete .q-btn__content {
  color: rgba(255, 100, 100, 0.85) !important;
}
.spoony-model-dropdown {
  position: relative;
  min-width: 140px;
}
.spoony-model-trigger {
  background: rgba(0, 229, 255, 0.06);
  border: 1px solid rgba(0, 229, 255, 0.3);
  border-radius: 4px;
  /* color: #4df5ff; */
  font-size: 12px;
  padding: 5px 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}
.spoony-model-arrow {
  font-size: 10px;
  color: rgba(0, 229, 255, 0.6);
}
.spoony-model-menu {
  position: absolute;
  right: 0;
  top: calc(100% + 3px);
  background: #0a1628;
  border: 1px solid rgba(0, 229, 255, 0.3);
  border-radius: 4px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
  z-index: 9999;
  min-width: 140px;
  overflow: hidden;
}
.spoony-model-item {
  padding: 8px 12px;
  font-size: 12px;
  color: rgba(200, 220, 255, 0.7);
  cursor: pointer;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
}
.spoony-model-item:last-child {
  border-bottom: none;
}
.spoony-model-item:hover {
  background: rgba(0, 229, 255, 0.06);
  color: rgba(255, 255, 255, 0.9);
}
.spoony-model-item.active {
  background: rgba(0, 229, 255, 0.1);
  color: white;
}
</style>
