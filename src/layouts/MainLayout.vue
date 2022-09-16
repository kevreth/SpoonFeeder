<template>
  <q-layout view="hHh Lpr lFf">
    <q-header class="bg-none">
      <q-toolbar>
        <q-toolbar-title />
        <q-icon
          size="250%"
          name="menu"
          @click="toggleIcon"
          style="cursor: pointer"       
          :class="{ blury: showOverlay }"/>
      </q-toolbar>
    </q-header>

    <q-item-section>
      <teleport to=".overlays" v-if="showOverlay">
        <HamburgerOverlay @close="toggleIcon"
         />
      </teleport>
    </q-item-section>     

    <q-page-container
      :class="{ blury: showOverlay }">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<!-- <script setup>
  import ref from 'vue'
  // import HamburgerOverlay from 'src/components/HamburgerOverlay.vue';

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
.q-page-container {
  padding-top: calc(50px + env(safe-area-inset-top, 0)) !important;
}
.blury {
  filter: blur(10px);
}
</style>
