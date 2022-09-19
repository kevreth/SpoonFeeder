<template>
  <q-btn
    size="200%"
    class="overlay"
    icon="menu"
    @click="overlay = true"
  />

  <q-overlay v-model="overlay">
    <template #body>
      <div class="fullscreen row justify-evenly items-center">
        <q-icon
        class="closeBtn z-top text-red"
        size="2em"
        v-if="overlay === true"
        name="close"
        @click="overlay = !overlay" />
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

const overlay = ref(false)
</script>

<style>
.closeBtn {
  position:absolute; 
  top:25%; 
  right:25%; 
  cursor:pointer;
}
</style>
