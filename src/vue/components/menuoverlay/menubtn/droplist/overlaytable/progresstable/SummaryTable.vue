<template>
  <transition
    :name="isEnable ? 'transitions' : ''"
    :duration="1000">
    <q-overlay class="summaryOverlay bg-secondary" :class="{'transition': isEnable}">
      <template #body>
        <div class="justify-evenly summaryContainer">
          <!-- {{ content }} -->
        </div>

        <ExitBtn @click="closeSummary" />
      </template>
    </q-overlay>
  </transition>
</template>

<script setup lang="ts">
import ExitBtn from '../../../../../common/ExitBtn.vue';

defineProps({
  isEnable: {
    type: Boolean,
    default: true
  }
})

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

