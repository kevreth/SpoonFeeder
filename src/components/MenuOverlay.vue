<template>
  <MenuBtn @click="handleOverlay"/>
  
  <q-overlay v-model="overlay"> 
    <template #body>
      <HierarchyPage style="cursor:auto"/>
      <TrashBtn />
      <OverlayCloseBtn @click="handleOverlay"/>
      <!-- <StartOver class="z-top"/> -->
    </template>
  </q-overlay>
</template>

<script setup>
import { ref } from 'vue'
// import StartOver from './StartOver.vue'
import OverlayCloseBtn from './OverlayCloseBtn.vue';
import MenuBtn from './MenuBtn.vue';
import HierarchyPage from './HierarchyPage.vue';
import TrashBtn from './TrashBtn.vue';

const overlay = ref(false)

function handleOverlay() {
  overlay.value = !overlay.value
}
</script>

<style>
.q-overlay {
  backdrop-filter: blur(5px);
}
</style>