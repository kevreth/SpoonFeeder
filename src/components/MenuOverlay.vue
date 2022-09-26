<template>
  <MenuBtn @click="handleOverlay"/>

  <q-overlay v-model="overlay">
  <template #body>
    <div class="parent">
      <div class="child1">
          <TrashBtn @click="startOver"/>
          <OverlayCloseBtn @click="handleOverlay"/>
      </div>

      <ProgressTable style="cursor:auto"/>
    </div>
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
.parent {
  position: absolute;
  width: 600px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.child1 {
  position: relative;
  top: 10px;
  left: 200px;
  min-height: 100vh;
}

</style>
