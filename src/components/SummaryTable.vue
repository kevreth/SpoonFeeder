<template>
  <!-- <div class="q-pa-md row justify-around" style="height: 100%; width: 100%;">     -->
    <!-- <q-icon class="summary" name="summarize" @click="model = true"></q-icon> -->
    <q-overlay
      :z-index="5000"
      :summaryOverlay="summaryOverlay">
      <template #body>
        <div class="justify-evenly summaryContainer"
        style="max-width: 700px; width: 100%;">          
          <td style="padding-left:0px" class="q-mt-sm">{{ question }}</td> 
          <td style="padding-left:0px">{{ correct }}</td>
          <td style="padding-left:0px">{{ pctCorrect }}</td>
          <!-- {{ content }} -->
        </div>
        <q-btn
          color="primary"
          label="Exit"
          class="q-mt-lg fixed-center"
          @click="closeSummary" />
      </template>
    </q-overlay>

  <!-- </div> -->
</template>

<script setup>
// import { evaluate } from 'app/main/quiz/evaluate/evaluate.support'
import getSummary from '../composables/getSummary'

defineProps({ summaryOverlay: Boolean })

const emit = defineEmits(['closeSummary'])

function closeSummary() {
  emit('closeSummary')
}
// const content = evaluate(JSON.get())
const { question, correct, pctCorrect } = getSummary()
 

</script>

<style>

</style>