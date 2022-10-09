<template>
  <div class="q-pa-md row justify-around" style="height: 100%; width: 100%;">    
    <q-icon class="summary" name="summarize" @click="model = true"></q-icon>
    <q-overlay v-model="model" :z-index="5000">
      <template #body>
        <div class="justify-evenly summaryContainer">          
          <!-- <q-btn v-if="model === true && waiting !== true" color="primary" label="Exit" @click="model = !model" /> -->
          <td style="padding-left:0px">{{ question }}</td> 
          <td style="padding-left:0px">{{ correct }}</td>
          <td style="padding-left:0px">{{ pctCorrect }}</td>
        </div>
      </template>
    </q-overlay>

  </div>
</template>

<script setup>
import getSummary from '../composables/getSummary'
import { ref } from 'vue';

const model = ref(false);
const { question, correct, pctCorrect } = getSummary()
 

</script>

<style>
.summary:hover {
  color: #999;
  cursor: pointer;
}
.summaryContainer {
  display:grid;
}
</style>