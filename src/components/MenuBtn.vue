<template>
  <div>
    <q-btn
      size="200%"
      icon="menu"
      @click="handleOverlay"
    />
  
    <MenuOverlay
      v-model="overlay"
      @close="handleOverlay"/>
  </div>
</template>

<script setup>
import MenuOverlay from './MenuOverlay.vue'
import { ref } from 'vue'

const overlay = ref(false)

function handleOverlay() {
  overlay.value = !overlay.value
}
</script>
