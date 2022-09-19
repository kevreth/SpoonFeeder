<template>
  <q-btn
    size="200%"
    icon="menu"
    @click="overlay = true"
  />
  
  <q-overlay v-model="overlay">
    <template #body>
      <div class="fullscreen row justify-evenly items-center" >
        <div class="overlayColor">
          <q-icon
          class="closeBtn z-top text-red"
          size="2em"
          v-if="overlay === true"
          name="close"
          @click="overlay = !overlay" />
        </div>
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
  top:0; 
  right:0; 
  cursor:pointer;
}
.q-overlay {
  backdrop-filter: blur(5px);
}
.overlayColor {
  position: fixed;
  background-color: #3a3a3a;
  opacity: 0.6;
  width: 70%;
  top: 10%;
  bottom: 10%; 
  left: 15%;
  border-radius: 20px;
}
</style>
