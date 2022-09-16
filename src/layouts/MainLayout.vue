<template>
  <q-layout view="hHh Lpr lFf">

    <q-header class="bg-black">
      <q-toolbar>
        <q-toolbar-title />
        <q-btn
          size="250%"
          icon="menu"
          @click="toggleIcon"/>
      </q-toolbar>
    </q-header>

    <q-item-section>
      <teleport to=".overlays" v-if="showOverlay">
        <HamburgerOverlay @close="toggleIcon" />
      </teleport>
    </q-item-section>     

    <q-page-container :class="{ blury: showOverlay }">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<!-- <script setup>
  import HamburgerOverlay from 'src/components/HamburgerOverlay.vue';

  let showOverlay = ref(false);

  function toggleIcon() {
      showOverlay.value = !showOverlay.value;
    }
</script> -->

<script>
import { defineComponent, ref } from 'vue';
import HamburgerOverlay from 'src/components/HamburgerOverlay.vue';

export default defineComponent ({
  components: { HamburgerOverlay },

  setup () {
    const showOverlay = ref(false)

    return {
      showOverlay,
      toggleIcon () {
        showOverlay.value = !showOverlay.value
      }
    }
  }
})
</script>

<style>
.blury {
  filter: blur(10px);
}
</style>
