<template>
  <q-layout>
    <q-card class="iconHamburger z-top">
      <MenuOverlay />
    </q-card>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import MenuOverlay from '../components/MenuOverlay.vue'

import { onBeforeUnmount, onMounted } from 'vue'
import { useQuasar } from 'quasar'

// loading page
const $q = useQuasar()
let timer

onBeforeUnmount(() => {
  if (timer !== void 0) {
    clearTimeout(timer)
    $q.loading.hide()
  }
})
onMounted(() => {
  $q.loading.show()
  // hiding in 1s
  timer = setTimeout(() => {
    $q.loading.hide()
    timer = void 0
  }, 1000)
})
</script>

<style>
.q-page-container {
  padding-top: calc(0px + env(safe-area-inset-top, 0)) !important;
}
.iconHamburger {
  max-height: 0px;
  display: flex;
  float: right;
}
</style>
