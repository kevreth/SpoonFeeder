<template>
  <div class="q-pa-md row justify-around" style="max-width: 700px; width: 100%;">    
    <q-icon class="summary" name="summarize" @click="model = true"></q-icon>
    <q-overlay v-model="model" :no-scroll="noScroll" :z-index="5000">
      <template #body>
        <div class="fullscreen row justify-evenly items-center">          
          <!-- <q-btn v-if="model === true && waiting !== true" color="primary" label="Exit" @click="model = !model" /> -->
        </div>
      </template>
    </q-overlay>

  </div>
</template>

<script setup>
  import { ref } from 'vue';
  const model = ref(false);

</script>

<style>
.summary:hover {
  color: #999;
  cursor: pointer;
}
</style>