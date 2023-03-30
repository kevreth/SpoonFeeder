<template>
  <transition appear group
  enter-active-class="animated zoomInUp"
  leave-active-class="animated zoomOutDown"
  >
  <q-overlay>
    <template #body>        
      <div class="overlay fixed-center column" style="display: flex; flex-direction: column;">
        <div class="overlayBtn">
          <OverlayCloseBtn @click="$emit('handleOverlay')"/>
          <TrashBtn @click="startOver" />
        </div>

        <div class="progressBackground" style="flex-grow: 1;">
          <ProgressTable style="cursor: auto" />
        </div>
      </div>
    </template>
  </q-overlay>
</transition>
</template>

<script setup>
import OverlayCloseBtn from './OverlayCloseBtn.vue';
import ProgressTable from './ProgressTable.vue';
import TrashBtn from './TrashBtn.vue';
import getStartOver from '../composables/startOver';


// start over functionality
function startOver() {
const { clear, reload } = getStartOver();
return { clear, reload };
}


</script>