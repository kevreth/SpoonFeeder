<template>
  <MenuBtn @click="handleOverlay"/>

  <q-overlay v-model="overlay">
    <template #body>
      <ProgressTable style="cursor:auto"/>
      <TrashBtn @click="startOver"/>
      <OverlayCloseBtn @click="handleOverlay"/>
    </template>
  </q-overlay>
</template>

<script setup>
import { ref } from 'vue'
import OverlayCloseBtn from './OverlayCloseBtn.vue';
import MenuBtn from './MenuBtn.vue';
import ProgressTable from './ProgressTable.vue';
import TrashBtn from './TrashBtn.vue';
import getStartOver from '../composables/startOver';

const overlay = ref(false)

function handleOverlay() {
  overlay.value = !overlay.value
}

function startOver() {
  const { clear, reload } = getStartOver();
  return { clear, reload };
  }
</script>

<style>
.q-overlay {
  backdrop-filter: blur(5px);
}
</style>
