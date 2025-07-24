<template>
  <q-layout>
    <q-card class="homePage">
      <MenuOverlay />
    </q-card>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import MenuOverlay from '../components/menuoverlay/MenuOverlay.vue';
import { onBeforeUnmount, onMounted } from 'vue';
import { useQuasar } from 'quasar';

// loading page
const $q = useQuasar();
let timer: ReturnType<typeof setTimeout> | undefined;

onBeforeUnmount(() => {
  if (timer !== void 0) {
    clearTimeout(timer);
    $q.loading.hide();
  }
});
onMounted(() => {
  $q.loading.show();
  // hiding in 1s
  timer = setTimeout(() => {
    $q.loading.hide();
    timer = void 0;
  }, 1000);
});
</script>

<style>
.homePage {
  max-height: 0px;
  display: flex;
  /* float: left; */
  z-index: 1;
  padding: 0;
  margin: 0;
}
</style>
