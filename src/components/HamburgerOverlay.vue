<template>
  <!-- <div class="overlay">
    <a href="#" @click="closeOverlay" class="closeOverlay">X</a>
  </div> -->

  <!-- <q-btn class="overlay z-top">
    <q-icon
      name="close"
      color="negative"
      style="position:absolute; top:0; right:0"
      class="q-mr-xs q-mt-xs q-p-none"
      size="42px"
      @click="closeOverlay" 
    />
  </q-btn> -->

  <q-list class="overlay z-top bg-secondary">
    <q-icon
      name="close"
      color="negative"
      class="closeOverlay q-mr-xs q-mt-xs q-p-none"
      size="42px"
      @click="closeOverlay" 
    />
    <StartOver />
  </q-list>


</template>

<script>
import StartOver from '../components/StartOver.vue';

export default {
  name: 'HamburgerOverlay',
  components: { StartOver },
  emits: ['close'],
  methods: {
    closeOverlay() {
      this.$emit('close');
    },
  },
};
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
.closeOverlay {
  position:absolute; 
  top:0; 
  right:0; 
  cursor:pointer;
}
</style>
