<template>
  <MenuBtn @click="handleOverlay" @keydown="overlay = false"/>

  <q-overlay v-model="overlay">
    <template #body>        
      <div class="hierarchy fixed-center">
        <div class="overlayBtn">
          <OverlayCloseBtn @click="handleOverlay" />
          <TrashBtn @click="startOver" />
        </div>

        <div class="hierarchyBackground">
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
.hierarchy {
  display: flex;
  flex-direction: column;
  height: 60%;
}
.hierarchyBackground {
  height: 70%;
  background-color: #3a3a3a;
  border-radius: 20px;
  overflow: auto;
}

</style>
