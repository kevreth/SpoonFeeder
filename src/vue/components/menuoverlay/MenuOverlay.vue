<template>
  <div class="menu-btn-row">
    <ExplainIcon id="explainIcon" @click="handleExpOverlay" />
    <MenuBtn id="menuBtn" @keyDeleted="onKeyDeleted" />
  </div>
  <ExpTable
    id="explainTable"
    v-model="expOverlay"
    :content="content"
    @closeInfo="expOverlay = false"
  />

  <SumNavigation />
  <div class="left-header-row">
    <VolumeMute id="volume" :volume="isMuted" @toggle-volume="toggleVolume" />
    <SpoonyIcon @open-spoony="onOpenSpoony" />
  </div>

  <SpoonySetup v-model="showSetup" @saved="onSpoonySaved" />
  <SpoonyChat v-model="showChat" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MenuBtn from './MenuBtn.vue';
import ExplainIcon from './ExplainIcon.vue';
import ExpTable from './ExpTable.vue';
import VolumeMute from './VolumeMute.vue';
import SpoonyIcon from './SpoonyIcon.vue';
import SpoonySetup from '../spoony/SpoonySetup.vue';
import SpoonyChat from '../spoony/SpoonyChat.vue';
import { getCurrentSlideExplanation } from '../../../ts/main/dataaccess/saveData/currentSlide';
import SumNavigation from './SumNavigation.vue';
import { getSpoonyData } from '../../composables/spoonyData';

const isMuted = ref(false);

function toggleVolume() {
  isMuted.value = !isMuted.value;
}
const expOverlay = ref(false);
const content = ref('');
const showSetup = ref(false);
const showChat = ref(false);

function onOpenSpoony() {
  const data = getSpoonyData();
  if (data.isConfigured()) {
    showChat.value = true;
  } else {
    showChat.value = false;
    showSetup.value = true;
  }
}

function onKeyDeleted() {
  showChat.value = false;
}

function onSpoonySaved() {
  showSetup.value = false;
  showChat.value = true;
}

// handle overlay pages
function handleExpOverlay() {
  expOverlay.value = !expOverlay.value;
  content.value = getCurrentSlideExplanation();
}
</script>

<style>
.menu-btn-row {
  position: fixed;
  top: 0;
  right: 0;

  z-index: 100;
}

.left-header-row {
  position: fixed;
  left: 0;
  top: 0;
  z-index: -1;
}

.menu-btn-row,
.left-header-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
}

.spoonyIcon:hover,
.volumeMute:hover {
  transform: scale(1.2);
}

.spoonyIcon .q-focus-helper,
.volumeMute .q-focus-helper {
  display: none !important;
}
/* .spoonyIcon:hover, .volumeMute:hover {
  background: transparent !important;
} */
</style>
