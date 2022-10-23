<template>
  <MenuBtn @click="overlay = true" @keydown.esc="overlay = false"/>

  <q-overlay v-model="overlay">
    <template #body>        
      <div class="overlay fixed-center column">
        <div class="overlayBtn">
          <OverlayCloseBtn @click="handleOverlay" />
          <TrashBtn @click="startOver" />
        </div>

        <div class="progressBackground bg-secondary">
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
.overlay {
  height: 60%;
}
.progressBackground {
  height: 80%;
  border-radius: 10px;
  overflow: auto;
}
.overlayBtn {
  color: #fc3d08;
  font-size: 25px;
}
</style>
