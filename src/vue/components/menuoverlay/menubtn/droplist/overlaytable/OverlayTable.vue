<template>
  <!-- <transition appear group :name="isEnable ? 'transitions-zoom' : ''"> -->
  <q-dialog
    v-model="props.showOverlay"
    id="overlay"
    @click.stop=""
    :class="{ transition: isEnable }"
    transition="zoom"
  >
    <div
      id="overlayTable"
      class="overlayTable column"
      style="display: flex; flex-direction: column"
    >
      <div class="overlayBtn">
        <TrashBtn id="startOver" @click="askToStartOver" />
        <OverlayCloseBtn id="closeBtn" @click="closeOverlay" />

        <ConfirmStartOverDialog ref="confirmRef" />
      </div>
      <!-- <div class="hierachy-container">
        <ProgressTable style="cursor: auto" />
      </div> -->

      <div
        id="progressBackground"
        class="progressBackground"
        style="flex-grow: 1"
      >
        <ProgressTable style="cursor: auto" />
      </div>
    </div>
  </q-dialog>
  <!-- </transition> -->
</template>

<script setup lang="ts">
import OverlayCloseBtn from './OverlayCloseBtn.vue';
import ProgressTable from './progresstable/ProgressTable.vue';
import TrashBtn from './TrashBtn.vue';
import { ref } from 'vue';
import ConfirmStartOverDialog from '../../../ConfirmStartOverDialog.vue';

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
const confirmRef = ref<InstanceType<typeof ConfirmStartOverDialog> | null>(
  null,
);

const askToStartOver = () => {
  if (confirmRef.value) {
    confirmRef.value.open();
  } else {
    console.warn('Dialog not available yet!');
  }
};
</script>

<style>
.overlayTable {
  /* height: 90%; */
  /* border: 1px solid #00bfff; */

  height: 98%;
  top: 5px;
  position: absolute;
}
.progressBackground {
  height: 70%;
  overflow: auto;
  background: transparent;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch; /* smooth scrolling in iOS*/
  overscroll-behavior: none; /* prevent table be dragable in iOS */
}
/* darket overlay */
.q-dialog__backdrop {
  background-color: rgba(0, 0, 0, 0.85);
}
.overlayBtn {
  /* font-size: 1.7em;
  color: deeppink;
  background: rgba(0, 0, 0, 1); */
  text-align: right;
}
.animated {
  animation-duration: 1s;
}
</style>
