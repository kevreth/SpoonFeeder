<template>
  <transition
    enter-active-class="animated fadeInLeft"
    leave-active-class="animated fadeOutRight"
    :duration="1000">
    <q-overlay class="summaryOverlay bg-secondary">
      <template #body>
        <div class="justify-evenly summaryContainer">
          <!-- {{ content }} -->
        </div>
  
        <ExitBtn @click="closeSummary" />
      </template>
    </q-overlay>
  </transition>
</template>

<script setup>
import ExitBtn from './ExitBtn.vue';
// import { Json } from '../ts/main/globals'
// import { evaluate } from '../ts/main/quiz/evaluate/evaluate.support'

const emit = defineEmits(['closeSummary'])
function closeSummary() {
  emit('closeSummary')
}

// const json = Json.get();
// const content = evaluate(json)
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

