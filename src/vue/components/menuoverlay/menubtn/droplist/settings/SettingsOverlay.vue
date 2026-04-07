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
          <span style="font-size: 16px; opacity: 0.6; margin-right: 8px;">🌐</span>{{ $t('settingsContent.language') }}
        </span>
        <SwitchLang class="q-ma-sm"></SwitchLang>
      </div>
      <ExitBtn style="z-index: -1" @click="closeInfo" />
    </div>
    <!-- </template> -->
  </q-dialog>
</template>

<script setup lang="ts">
import ExitBtn from '../../../../common/ExitBtn.vue';
import { ref } from 'vue';
// import OverlayCloseBtn from '../overlaytable/OverlayCloseBtn.vue';
import SwitchLang from './switchlanguages/SwitchLang.vue';

// const settingOverlay = ref(false);
const showOverlay = ref(true);

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
  min-width: 260px;
  margin: 0;
  font-size: 1rem;
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
.corner-tl { top: 2px; left: 2px; border-width: 2px 0 0 2px; }
.corner-tr { top: 2px; right: 2px; border-width: 2px 2px 0 0; }
.corner-bl { bottom: 2px; left: 2px; border-width: 0 0 2px 2px; }
.corner-br { bottom: 2px; right: 2px; border-width: 0 2px 2px 0; }
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
  display: block;
  margin: 0 auto;
}
</style>
