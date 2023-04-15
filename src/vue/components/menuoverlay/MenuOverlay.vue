<template>
  <MenuBtn id="menuBtn"/>
  <ExplainIcon id="explainIcon" @click="handleExpOverlay" :style="{ zIndex: -1 }"/>
  <ExpTable
    id="explainTable"
    v-model="expOverlay"
    :content="content"
    @closeInfo="expOverlay = false"
  />
  <div id="summary" class="sumNavigation q-mt-xs q-ml-sm">
    <SumNavigation/>
    <VolumeMute
    id="volume"
    :volume="isMuted"
    @toggle-volume="toggleVolume"/>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MenuBtn from './MenuBtn.vue';
import ExplainIcon from './ExplainIcon.vue';
import ExpTable from './ExpTable.vue';
import VolumeMute from './VolumeMute.vue'
import {SaveData} from '../../mediator';
import SumNavigation from './SumNavigation.vue';

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

<style>
/* .leftRowMenu {
  position: absolute;
  width: 300px;
  background: red;
} */
.sumNavigation {
  position: fixed;
  /* position: absolute; */
  display: flex;
  top: 0;
  left: 0px;
  /* width: 250px; */
  /* max-width: 35%; */
  /* overflow: auto; */
  /* background: red; */
}
</style>

