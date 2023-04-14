<template>
  <q-overlay class="summaryOverlay bg-secondary">
    <template #body>
      <div class="justify-evenly summaryContainer">
        <!-- {{ content }} -->
      </div>

      <ExitBtn @click="closeSummary" />
    </template>
  </q-overlay>
</template>

<script setup lang="ts">
import ExitBtn from '../../../../../common/ExitBtn.vue';

const emit = defineEmits(['closeSummary'])
function closeSummary() {
  emit('closeSummary')
}
</script>

<style>
.summaryContainer {
  display: flex;
  flex-direction: row;
  cursor: auto;
}
.fullscreen {
  border-radius: 8px !important;
}
</style>

