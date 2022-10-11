<template>
   <q-icon
    class="summary"
    name="summarize"
    @click="summaryOverlay = true">
  </q-icon>
   <SummaryTable
    v-model="summaryOverlay"
    @closeSummary="handleCloseSummary"/>
</template>

<script setup>
import SummaryTable from './SummaryTable.vue';
import { ref } from 'vue';

const summaryOverlay = ref(false);
function handleCloseSummary() {
  summaryOverlay.value = !summaryOverlay.value;
}
</script>

<style>
.summary:hover {
  color: #999;
  cursor: pointer;
}
</style>