<!-- ConfirmStartOverDialog.vue -->
<template>
  <q-dialog v-model="showConfirm" persistent style="z-index: 10000">
    <q-card style="min-width: 300px" class="confirm fixed-center">
      <q-card-section>
        Are you sure you want to start over? You will lose your current
        progress.
      </q-card-section>

      <q-card-actions align="center" class="q-px-md">
        <q-btn
          flat
          label="Cancel"
          color="primary"
          v-close-popup
          class="q-mb-sm q-mr-md highlight-btn bg-primary text-white"
          @click="handleCancel"
        />
        <q-btn
          flat
          label="OK"
          color="negative"
          @click="handleOk"
          class="q-mb-sm q-mr-xs highlight-btn bg-primary"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import getStartOver from '../../composables/startOver.ts';

const showConfirm = ref(false);

function open() {
  showConfirm.value = true;
}

defineExpose({ open });

function startOver() {
  const { clear, reload } = getStartOver();
  return { clear, reload };
}

function handleOk() {
  startOver();
  showConfirm.value = false;
}

// Handle Cancel
function handleCancel() {
  console.log('User canceled the action');
}
</script>

<style>
.confirm {
  background: rgba(0, 0, 0, 1);
  border: 1px solid #00bfff;
  box-shadow:
    0 0 10px #00bfff,
    inset 0 0 20px rgba(0, 255, 0, 0.5);
  /* padding: 20px; */
  border-radius: 10px;
  /* width: 100vw; */
  /* z-index: 2; */
}
</style>
