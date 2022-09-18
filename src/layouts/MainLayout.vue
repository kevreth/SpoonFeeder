<template>
  <q-layout>
    <q-header class="bg-none q-m-none q-pt-md">
      <q-toolbar>
        <q-icon></q-icon>
        <q-toolbar-title></q-toolbar-title>
        <q-icon>
          <HamburgerOverlay />
        </q-icon>
      </q-toolbar>
    </q-header>

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
/* .blury {
  filter: blur(10px);
} */
</style>
