<template>
  <q-overlay
    class="bg-secondary "
    :z-index="5000"
    :summaryOverlay="summaryOverlay">
    <template #body>    
      <div class="justify-evenly summaryContainer">
        {{ question }} <br>
        {{ correct }} <br>
        {{ pctCorrect }}
      </div>   

      <SummaryExit @click="closeSummary" />
    </template>
  </q-overlay>
</template>

<script setup>
// import { Json } from '../ts/main/globals'
// import { evaluate } from '../ts/main/quiz/evaluate/evaluate.support'

import getSummary from '../composables/getSummary'
import SummaryExit from './SummaryExit.vue';

defineProps({ summaryOverlay: Boolean })
const emit = defineEmits(['closeSummary'])
function closeSummary() {
  emit('closeSummary')
}

// const content = evaluate(Json.get())
const { question, correct, pctCorrect } = getSummary()
</script>

<style>
.summaryContainer {
  display: flex;
  flex-direction: row;
  cursor: auto;  
}
</style>