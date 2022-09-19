<template>
  <q-layout>
      
    <q-card class="iconHamburger z-top">
      <HamburgerOverlay />
    </q-card>             

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>

</template>

<script setup>
  import HamburgerOverlay from 'src/components/HamburgerOverlay.vue';
</script>

<style>
.q-page-container {
  padding-top: calc(0px + env(safe-area-inset-top, 0)) !important;
}
.iconHamburger{
  max-height: 0px;
  display: flex;
  float: right;
}
.blury {
  filter: blur(10px);
}
</style>
