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
      <div class="settings-list">
        <!-- Example: Music Toggle -->
        <div class="setting-item row items-center q-px-lg q-py-sm">
          <div class="col text-left">
            <q-icon name="music_note" size="sm" class="q-mr-sm" />
            <span class="text-body1">Music</span>
          </div>
          <div class="col-auto">
            <q-toggle v-model="musicEnabled" color="blue" />
          </div>
        </div>

        <!-- SFX Toggle -->
        <div class="setting-item row items-center q-px-lg q-py-sm">
          <VolumeMute v-model:volume="isMuted" />
          <!-- <div class="col text-left">
            <q-icon name="volume_up" size="sm" class="q-mr-sm" />
            <span class="text-body1">SFX</span>
          </div>
          <div class="col-auto">
            <q-toggle v-model="sfxEnabled" color="blue" />
          </div> -->
        </div>

        <!-- Haptics Toggle -->
        <div class="setting-item row items-center q-px-lg q-py-sm">
          <div class="col text-left">
            <q-icon name="vibration" size="sm" class="q-mr-sm" />
            <span class="text-body1">Haptics</span>
          </div>
          <div class="col-auto">
            <q-toggle v-model="hapticsEnabled" color="blue" />
          </div>
        </div>

        <!-- Colorblind Mode -->
        <div class="setting-item row items-center q-px-lg q-py-sm">
          <div class="col text-left">
            <q-icon name="visibility" size="sm" class="q-mr-sm" />
            <span class="text-body1">Colorblind Mode</span>
          </div>
          <div class="col-auto">
            <q-toggle v-model="colorblindMode" color="blue" />
          </div>
        </div>
      </div>

      <!-- <q-separator color="white" /> -->

      <!-- Language Button -->

      <!-- <div class="row q-pl-md">
        <div class="q-pt-lg q-pr-xl">
          {{ $t('settingsContent.language') }}
        </div>
        <LangOptions v-model="langOptions" @click="langOptions = false" />
      </div> -->

      <div class="btn-group inline-flex">
        <q-btn
          unelevated
          no-caps
          class="blue-btn items-center"
          @click="openLanguagePopup"
        >
          <div class="q-pr-xl">
            {{ $t('settingsContent.language') }}
          </div>
          <SwitchLang class="q-pa-none q-ma-none"></SwitchLang>
        </q-btn>

        <!-- <div class="action-buttons q-pa-md q-gutter-y-sm"> -->
        <q-btn unelevated no-caps class="blue-btn" label="Contact Us" />
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
// import LangOptions from './switchlanguages/LangOptions.vue';
import VolumeMute from '../../../VolumeMute.vue';

// Props & Emits
const emit = defineEmits(['closeInfo']);

// Internal state for toggles
const musicEnabled = ref(true);
const hapticsEnabled = ref(false);
const colorblindMode = ref(false);
const openLanguagePopup = ref(false);

// Control dialog visibility
const dorplist = ref(true);
// const showLanguagePopup = ref(false);
// Close handler
function closeInfo() {
  emit('closeInfo');
  dorplist.value = false;
}

const isMuted = ref(false);
</script>

<style>
.blue-btn {
  /* display: flex; */
  /* align-items: center; */
  /* justify-content: space-between; */
  background-color: #172a3f;
  color: white;
  border-radius: 10px;
  /* padding: 8px 16px; */
  /* font-size: 14px; */
  font-size: 1rem;
  cursor: pointer;
  margin-top: 10px;
  border: 1px solid #00bfff;
  min-height: 50px;
  min-width: 300px;
  /* border: none;
  padding: 10px 20px;
  text-transform: uppercase;
  box-shadow: 0 0 5px #0ff;
  cursor: pointer;
  transition: all 0.3s ease; */
}

.language-btn:hover {
  background-color: #0056b3;
}

.btn-group {
  display: inline-flex;
  flex-direction: column;
}

.btn-group .q-btn {
  flex: 1; /* Equal width */
}
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
