<template>
  <q-dialog v-model="dorplist" class="setting-overlay" :z-index="3" @click.stop>
    <div class="settings-dialog bg-primary text-white">
      <!-- Header -->

      <div class="header text-center q-py-sm q-px-sm relative-position">
        <div class="text-h6">{{ $t('settingsContent.title') }}</div>
        <OverlayCloseBtn class="absolute-top-right" @click="closeInfo" />
      </div>

      <q-separator color="white" />

      <!-- Settings List -->
      <div class="settings-list q-py-md">
        <!-- Language Setting -->
        <div class="setting-item row items-center q-px-md q-py-sm">
          <div class="col">
            <div class="text-body1">{{ $t('settingsContent.language') }}</div>
          </div>
          <div class="col-auto">
            <SwitchLang />
          </div>
        </div>

        <!-- Example: Music Toggle -->
        <div class="setting-item row items-center q-px-md q-py-sm">
          <div class="col">
            <q-icon name="music_note" size="sm" class="q-mr-sm" />
            <span class="text-body1">Music</span>
          </div>
          <div class="col-auto">
            <q-toggle v-model="musicEnabled" color="blue" />
          </div>
        </div>

        <!-- SFX Toggle -->
        <div class="setting-item row items-center q-px-md q-py-sm">
          <div class="col">
            <q-icon name="volume_up" size="sm" class="q-mr-sm" />
            <span class="text-body1">SFX</span>
          </div>
          <div class="col-auto">
            <q-toggle v-model="sfxEnabled" color="blue" />
          </div>
        </div>

        <!-- Haptics Toggle -->
        <div class="setting-item row items-center q-px-md q-py-sm">
          <div class="col">
            <q-icon name="vibration" size="sm" class="q-mr-sm" />
            <span class="text-body1">Haptics</span>
          </div>
          <div class="col-auto">
            <q-toggle v-model="hapticsEnabled" color="blue" />
          </div>
        </div>

        <!-- Colorblind Mode -->
        <div class="setting-item row items-center q-px-md q-py-sm">
          <div class="col">
            <q-icon name="visibility" size="sm" class="q-mr-sm" />
            <span class="text-body1">Colorblind Mode</span>
          </div>
          <div class="col-auto">
            <q-toggle v-model="colorblindMode" color="blue" />
          </div>
        </div>
      </div>

      <q-separator color="white" />

      <!-- Action Buttons -->
      <div class="action-buttons q-pa-md q-gutter-y-sm">
        <q-btn
          unelevated
          no-caps
          color="info"
          class="full-width"
          padding="sm lg"
          label="Language"
          @click="onRestorePurchase"
        />
      </div>

      <div class="action-buttons q-pa-md q-gutter-y-sm">
        <q-btn
          unelevated
          no-caps
          color="info"
          class="full-width"
          padding="sm lg"
          label="Customer Care"
        />
      </div>

      <!-- <ExitBtn
        @click="closeInfo"
        class="action-buttons q-pa-md q-gutter-y-sm"
        style="top: 12px; right: 12px; font-size: 20px"
      /> -->
    </div>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SwitchLang from './switchlanguages/SwitchLang.vue';
import OverlayCloseBtn from '../overlaytable/OverlayCloseBtn.vue';

// Props & Emits
const emit = defineEmits(['closeInfo']);

// Internal state for toggles
const musicEnabled = ref(true);
const sfxEnabled = ref(true);
const hapticsEnabled = ref(false);
const colorblindMode = ref(false);

// Control dialog visibility
const dorplist = ref(true);

// Close handler
function closeInfo() {
  emit('closeInfo');
  dorplist.value = false;
}
</script>

<style scoped>
.setting-overlay .q-dialog__inner > div {
  border-radius: 20px !important;
  overflow: hidden;
}

.settings-dialog {
  width: 90vw;
  max-width: 400px;
  border-radius: 20px;
  font-family: 'Roboto', sans-serif;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.header {
  font-weight: bold;
}

.setting-item {
  min-height: 48px;
}

.link {
  color: #6bb0ff;
  text-decoration: none;
  border-bottom: 1px solid #6bb0ff;
  font-size: 0.85rem;
}

.link:hover {
  opacity: 0.8;
}

.action-buttons .q-btn {
  font-weight: 600;
  border-radius: 10px;
}
</style>
