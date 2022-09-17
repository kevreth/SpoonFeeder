<template>
  <q-list>
    <q-list-item  class="overlay z-top bg-secondary">
      <q-icon
        name="close"
        color="negative"
        class="closeOverlay q-p-none"
        size="2.5em"
        @click="closeOverlay" 
      />
    </q-list-item>

    <q-list-item>
      <StartOver class="z-top"/>
    </q-list-item>
  </q-list>

</template>

<script setup>
import StartOver from '../components/StartOver.vue';

const emits = defineEmits(['close'])
function closeOverlay () {
  emits('close');
}

</script>

<style>
.overlay {
  position:fixed; 
  width:70%;
  border-radius:20px;
  opacity: 0.5; 
  top: 10%;
  bottom: 10%; 
  left: 15%;
}
.q-icon {
  position:absolute; 
  top:0; 
  right:0; 
  cursor:pointer;
}
</style>
