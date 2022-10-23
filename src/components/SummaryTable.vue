<template>
  <q-overlay
    class="bg-secondary"
    :z-index="5000"
  >
    <template #body>
      <div class="justify-evenly summaryContainer">
        <!-- {{ content }} -->
      </div>

      <ExitBtn @click="closeSummary" />
    </template>
  </q-overlay>
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
  border-radius: 8px !important
}
</style>

