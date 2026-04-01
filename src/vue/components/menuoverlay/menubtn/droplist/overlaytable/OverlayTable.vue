<template>
  <transition appear group :name="isEnable ? 'transitions-zoom' : ''">
    <q-dialog
      v-model="props.showOverlay"
      id="overlay"
      @click.stop=""
      :class="{ transition: isEnable }"
    >
      <!-- <template #body> -->
      <div
        id="overlayTable"
        class="overlayTable fixed-center column"
        style="display: flex; flex-direction: column"
      >
        <div class="overlayBtn">
          <span class="overlay-title">PROGRESS</span>
          <div class="overlayBtnActions">
            <OverlayCloseBtn id="closeBtn" @click="closeOverlay" />
            <TrashBtn id="startOver" @click="startOver" />
          </div>
        </div>

        <div
          id="progressBackground"
          class="progressBackground"
          style="flex-grow: 1"
        >
          <ProgressTable style="cursor: auto" />
        </div>
      </div>
      <!-- </template> -->
    </q-dialog>
  </transition>
</template>

<script setup lang="ts">
import OverlayCloseBtn from './OverlayCloseBtn.vue';
import ProgressTable from './progresstable/ProgressTable.vue';
import TrashBtn from './TrashBtn.vue';
import getStartOver from '../../../../../composables/startOver';

const props = defineProps({
  isEnable: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits<{
  (e: 'update:showOverlay', value: boolean): void;
  (e: 'handleOverlay'): void;
}>();

function closeOverlay() {
  emit('update:showOverlay', false);
  emit('handleOverlay');
}

// start over functionality
function startOver() {
  const { clear, reload } = getStartOver();
  return { clear, reload };
}
</script>

<style>
.overlayTable {
  height: fit-content;
  width: 100%;
  border: 1px solid rgba(0, 191, 255, 0.3);
}
.progressBackground {
  height: 70%;
  overflow: auto;
  background: transparent;
  overflow-x: hidden;
}
.overlayBtn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 10px;
  background: #0d1b2a;
  border-bottom: 1px solid #00bfff44;
  border-radius: 8px 8px 0 0;
}
.overlay-title {
  color: #00bfff;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 2px;
}
.overlayBtnActions {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #fc3d08;
}
.animated {
  animation-duration: 1s;
}
@media (min-width: 768px) {
  .overlayTable {
    width: fit-content;
  }
}
</style>
