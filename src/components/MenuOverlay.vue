<template>
  <MenuBtn @click="handleOverlay" />

  <q-overlay v-model="overlay">
    <template #body>
      <div class="overlayParent">
        <div class="buttonChild">
          <TrashBtn @click="startOver" />
          <OverlayCloseBtn @click="handleOverlay" />
        </div>

        <div class="hierarchyChild fixed-center">
          <ProgressTable style="cursor: auto" />
        </div>
      </div>
    </template>
  </q-overlay>
</template>

<script setup>
import { ref } from 'vue';
import OverlayCloseBtn from './OverlayCloseBtn.vue';
import MenuBtn from './MenuBtn.vue';
import ProgressTable from './ProgressTable.vue';
import TrashBtn from './TrashBtn.vue';
import getStartOver from '../composables/startOver';

const overlay = ref(false);

function handleOverlay() {
  overlay.value = !overlay.value;
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
.overlayParent {
  position: absolute;
  width: 600px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.buttonChild {
  position: relative;
  left: 220px;
  min-height: 100vh;
  padding-top: 10%;
  margin: 0;
  height: 100px;
}
.hierarchyChild {
  background-color: #3a3a3a;
  height: 60%;
  border-radius: 20px;
  padding: 2px 0 0 0;
  margin: 0;
  max-height: 100vh;
  overflow: auto;
}
</style>
