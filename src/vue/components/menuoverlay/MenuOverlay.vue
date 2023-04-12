<template>
  <MenuBtn id="menuBtn"/>
  <ExplainIcon id="explainIcon" @click="handleExpOverlay" :style="{ zIndex: -1 }"/>
  <ExpTable
    id="explainTable"
    v-model="expOverlay"
    :content="content"
    @closeInfo="expOverlay = false"
  />
  <VolumeMute
    id="volume"
    :volume="isMuted"
    @toggle-volume="toggleVolume"
    :style="{ zIndex: -1 }"/>

</template>

<script setup>
import { ref } from 'vue';
import MenuBtn from './MenuBtn.vue';
import ExplainIcon from './ExplainIcon.vue';
import ExpTable from './ExpTable.vue';
import VolumeMute from './VolumeMute.vue'
import {SaveData} from '../../../ts/main/quiz/datalayer/saveData';

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
</script>

