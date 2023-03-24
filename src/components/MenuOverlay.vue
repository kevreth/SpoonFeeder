<template>
  <MenuBtn @click="overlay = true" @keydown.esc="overlay = false"/>
  <ExplainIcon @click="handleExpOverlay"/>
  <ExpTable 
    v-model="expOverlay"
    @closeInfo="expOverlay = false"
  />

  <transition appear group
    enter-active-class="animated zoomInUp"
    leave-active-class="animated zoomOutDown"
    >
    <q-overlay v-model="overlay" class="mainOverlay">
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
  </transition>
</template>

<script setup>
import { ref } from 'vue';
import OverlayCloseBtn from './OverlayCloseBtn.vue';
import MenuBtn from './MenuBtn.vue';
import ProgressTable from './ProgressTable.vue';
import TrashBtn from './TrashBtn.vue';
import getStartOver from '../composables/startOver';
import ExplainIcon from './ExplainIcon.vue';
import ExpTable from './ExpTable.vue';

const overlay = ref(false);
const expOverlay = ref(false);

// handle overlay pages
function handleExpOverlay() {
  expOverlay.value = !expOverlay.value;
}
function handleOverlay() {
  overlay.value = !overlay.value;
}

// start over functionality
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
  font-family: "Segoe UI", "SF Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  height: 80%;
  border-radius: 10px;
  overflow: auto;
}
.overlayBtn {
  color: #fc3d08;
  font-size: 25px;
}
.animated {
  animation-duration: 1s;
}
</style>
