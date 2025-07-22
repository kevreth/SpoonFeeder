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
        class="overlayTable column"
        style="display: flex; flex-direction: column"
      >
        <div class="overlayBtn">
          <OverlayCloseBtn id="closeBtn" @click="closeOverlay" />
          <TrashBtn id="startOver" @click="confirmStartOver" />

          <q-dialog v-model="confirmStartOver">
            <q-card style="min-width: 300px">
              <q-card-section>
                <div class="text-h6">Confirm</div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                Are you sure you want to start over? You will lose your current
                progress.
              </q-card-section>

              <q-card-actions align="right">
                <q-btn flat label="Cancel" color="primary" v-close-popup />
                <q-btn
                  flat
                  label="Start Over"
                  color="negative"
                  @click="startOver"
                />
              </q-card-actions>
            </q-card>
          </q-dialog>
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
import { Dialog } from 'quasar';

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

function confirmStartOver() {
  Dialog.create({
    title: 'Confirm',
    message:
      'Are you sure you want to start over? You will lose your current progress.',
    cancel: true,
    persistent: true,
  })
    .onOk(() => {
      // User clicked OK
      startOver();
    })
    .onCancel(() => {
      // Optional: handle cancel
      console.log('User canceled the action');
    });
}

// start over functionality
function startOver() {
  const { clear, reload } = getStartOver();
  return { clear, reload };
}
</script>

<style>
.overlayTable {
  /* height: 60%; */
  /* width: 80vw; */
  height: 90%;
}
@media screen and (min-width: 1200px) {
  /* .overlayTable {
    width: 60vw;
  } */
}
.progressBackground {
  height: 70%;
  /* border-radius: 10px; */
  overflow: auto;
  background: transparent;
  overflow-x: auto;
}
.overlayBtn {
  /* color: #fc3d08; */
  font-size: 1.7em;
  color: deeppink;
}
/* @media screen and (min-width: 1200px) {
  .overlayBtn {
    font-size: 1.2vw;
  }
} */
.animated {
  animation-duration: 1s;
}
</style>
