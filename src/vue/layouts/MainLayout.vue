<template>
  <q-layout>
    <q-card v-if="!quizComplete" class="iconHamburger">
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
import { storeToRefs } from 'pinia';
import { useSlideStore } from '../stores/slideStore';

const { quizComplete } = storeToRefs(useSlideStore());

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
  timer = setTimeout(() => {
    $q.loading.hide();
    timer = void 0;
  }, 1000);
});
</script>

<style>
.iconHamburger {
  max-height: 0px;
  display: flex;
  float: left;
  z-index: 1;
}
</style>
