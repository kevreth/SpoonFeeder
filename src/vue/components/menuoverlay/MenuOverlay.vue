<template>
  <div>
    <MenuBtn id="menuBtn" class="z-top:1000" />
    <ExplainIcon id="explainIcon" @click="handleExpOverlay" />
    <SettingIcon />
  </div>

  <ExpTable
    id="explainTable"
    v-model="expOverlay"
    :content="content"
    @closeInfo="expOverlay = false"
  />

  <SumNavigation />
  <!-- <VolumeMute id="volume" :volume="isMuted" @toggle-volume="toggleVolume" /> -->
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MenuBtn from './MenuBtn.vue';
import ExplainIcon from './ExplainIcon.vue';
import ExpTable from './ExpTable.vue';
import VolumeMute from './VolumeMute.vue';
import { SaveData } from '../../mediator';
import SumNavigation from './SumNavigation.vue';
import SettingIcon from './SettingIcon.vue';

const isMuted = ref(false);

function toggleVolume() {
  isMuted.value = !isMuted.value;
}
const expOverlay = ref(false);
const content = ref('');

// handle overlay pages
function handleExpOverlay() {
  expOverlay.value = !expOverlay.value;
  content.value = SaveData.getCurrentSlide();
}
</script>

<style>
/* .headerIcon {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  padding-left: 20px;
} */
</style>
