<template>
  <div class="menu-btn-row">
    <ExplainIcon id="explainIcon" @click="handleExpOverlay" />
    <MenuBtn id="menuBtn" />
  </div>
  <ExpTable
    id="explainTable"
    v-model="expOverlay"
    :content="content"
    @closeInfo="expOverlay = false"
  />

  <SumNavigation />
  <VolumeMute id="volume" :volume="isMuted" @toggle-volume="toggleVolume" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MenuBtn from './MenuBtn.vue';
import ExplainIcon from './ExplainIcon.vue';
import ExpTable from './ExpTable.vue';
import VolumeMute from './VolumeMute.vue';
import { getCurrentSlideExplanation } from '../../../ts/main/dataaccess/saveData/currentSlide';
import SumNavigation from './SumNavigation.vue';

const isMuted = ref(false);

function toggleVolume() {
  isMuted.value = !isMuted.value;
}
const expOverlay = ref(false);
const content = ref('');

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
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px;
  z-index: 100;
}
</style>
