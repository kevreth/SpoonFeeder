<template>
  <transition appear group name="transitions">
  <q-overlay id="overlay" @click.stop="">
    <template #body>
      <div id="overlayTable" class="overlay fixed-center column" style="display: flex; flex-direction: column;">
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
  height: 70%;
  border-radius: 10px;
  overflow: auto;
}
.overlayBtn {
  color: #fc3d08;
  font-size: 15px;
}
.animated {
  animation-duration: 1s;
}
</style>
