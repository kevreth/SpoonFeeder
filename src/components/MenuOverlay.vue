<template>
  <q-overlay :overlay="overlayValue">
    <template #body>
      <OverlayCloseBtn @click="closeOverlay"/>
      
      <div>
        <StartOver class="z-top"/>
      </div>
    </template>
  </q-overlay>
</template>

<script setup>
import StartOver from './StartOver.vue'
import OverlayCloseBtn from './OverlayCloseBtn.vue';

defineProps({ overlayValue: Boolean });

const emit = defineEmits(['close'])
function closeOverlay () {
  emit('close')
}
</script>

<style>
.q-overlay {
  backdrop-filter: blur(5px);
}
</style>