<template>
  <q-layout>
    <div class="safari-toolbar-tint" aria-hidden="true"></div>
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

/* Confirmed on-device (iPhone 15, iOS 26): Safari's translucent toolbar
   tints itself from the background-color of a qualifying fixed/sticky
   element within 4px of the viewport top, at least 80% viewport-wide,
   at least 3px tall — it reads the color value, it does not need the
   element to visually span the toolbar's actual height. Kept at 6px so
   it clears the 3px minimum with a little margin while staying too thin
   to overlap real page content. theme-color meta tag has no effect on
   this in iOS 26 (dropped by WebKit); this element is what Safari
   actually reads instead. Rendered outside MenuOverlay.vue/the
   quizComplete-gated icon row so it's present on the summary screen too. */
.safari-toolbar-tint {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 6px;
  background-color: #1c1b22;
  z-index: 101;
  pointer-events: none;
}
</style>
