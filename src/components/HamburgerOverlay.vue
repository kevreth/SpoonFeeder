<template>
  <q-btn
    size="200%"
    class="overlay"
    icon="menu"
    @click="model = true"
  />
  <q-overlay v-model="model">
    <template #body>
      <div class="fullscreen row justify-evenly items-center">
        <q-btn v-if="model === true" color="blue" icon="close" @click="model = !model" />
      </div>
      <div>
        <StartOver class="z-top"/>
      </div>
    </template>
  </q-overlay>

</template>

<script setup>
import StartOver from '../components/StartOver.vue';
import { QOverlay } from '@quasar/quasar-ui-qoverlay'
import { ref } from 'vue'

const model = ref(false)

</script>

<style>
/* .overlay { */
  /* position:fixed;  */
  /* width:70%; */
  /* border-radius:20px; */
  /* opacity: 0.5;  */
  /* top: 10%; */
  /* bottom: 10%;  */
  /* left: 15%; */
/* } */
/* .q-icon {
  position:absolute; 
  top:0; 
  right:0; 
  cursor:pointer;
} */
</style>
