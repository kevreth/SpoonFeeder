<template>
  <transition appear group :name="isEnable ? 'transitions-zoom' : ''">
  <q-overlay id="overlay" @click.stop="" :class="{'transition': isEnable}">
    <template #body>
      <div id="overlayTable" class="overlayTable fixed-center column" style="display: flex; flex-direction: column;">
        <div class="overlayBtn">
          <OverlayCloseBtn id="closeBtn" @click="$emit('handleOverlay')"/>
          <TrashBtn id="startOver" @click="startOver" />
        </div>

        <div id="progressBackground" class="progressBackground" style="flex-grow: 1;">
          <ProgressTable style="cursor: auto" />
        </div>
      </div>
    </template>
  </q-overlay>
</transition>
</template>

<script setup lang="ts">
import OverlayCloseBtn from './OverlayCloseBtn.vue';
import ProgressTable from './progresstable/ProgressTable.vue';
import TrashBtn from './TrashBtn.vue';
import getStartOver from '../../../../../composables/startOver';

defineProps({
  isEnable: {
    type: Boolean,
    default: true
  }
})

// start over functionality
function startOver() {
  const { clear, reload } = getStartOver();
  return { clear, reload };
}
</script>

<style>
.overlayTable {
  height: 60%;
  /* width: 80vw; */
}
@media screen and (min-width: 1200px) {
  /* .overlayTable {
    width: 60vw;
  } */
}
.progressBackground {
  font-family: "Segoe UI", "SF Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  height: 70%;
  border-radius: 10px;
  overflow: auto;
}
.overlayBtn {
  color: #fc3d08;
  font-size: 2vw;
}
@media screen and (min-width: 1200px) {
  .overlayBtn {
    font-size: 1.2vw;
  }
}
.animated {
  animation-duration: 1s;
}
</style>
