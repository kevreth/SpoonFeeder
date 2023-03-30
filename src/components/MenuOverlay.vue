<template>
  <MenuBtn/>
  <ExplainIcon @click="handleExpOverlay"/>
  <ExpTable
    v-model="expOverlay"
    :content="content"
    @closeInfo="expOverlay = false"
  />

  <VolumeMute :volume="isMuted" @toggle-volume="toggleVolume" />

</template>

<script setup>
import { ref } from 'vue';
import MenuBtn from './MenuBtn.vue';
import getStartOver from '../composables/startOver';
import ExplainIcon from './ExplainIcon.vue';
import ExpTable from './ExpTable.vue';
import VolumeMute from './VolumeMute.vue'
import {SaveData} from '../ts/main/quiz/slide/saveData';

const overlay = ref(false);
const isMuted = ref(false);

function toggleVolume() {
  isMuted.value = !isMuted.value;
}
const expOverlay = ref(false);
const content=ref('')

// handle overlay pages
function handleExpOverlay() {
  expOverlay.value = !expOverlay.value;
  content.value = SaveData.getCurrentSlide();
}
function handleOverlay() {
  overlay.value = !overlay.value;
}

// start over functionality
function startOver() {
  const { clear, reload } = getStartOver();
  return { clear, reload };
}
</script>

<style>
.overlay {
  height: 60%;
}
.progressBackground {
  font-family: "Segoe UI", "SF Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  height: 70%;
  border-radius: 10px;
  overflow: auto;
}
.overlayBtn {
  color: #fc3d08;
  font-size: 25px;
}
.animated {
  animation-duration: 1s;
}
</style>
