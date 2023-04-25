<template>
  <MenuBtn id="menuBtn" class="z-top"/>
  <ExplainIcon id="explainIcon" @click="handleExpOverlay" />
  <ExpTable
    id="explainTable"
    v-model="expOverlay"
    :content="content"
    @closeInfo="expOverlay = false"
  />

  <SumNavigation/>
  <VolumeMute
  id="volume"
  :volume="isMuted"
  @toggle-volume="toggleVolume"/>
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

