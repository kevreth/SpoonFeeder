<template>
  <q-layout>
    <q-card>
      <MainSummary :rows="rows" />
      <MenuOverlay />
    </q-card>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import MenuOverlay from 'src/components/MenuOverlay.vue';
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useQuasar } from 'quasar'
import MainSummary from '../components/MainSummary.vue';
import {Score} from '../ts/main/quiz/score';
import {CourseFile} from '../ts/main/globals'

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
const rows = ref(0);
window.addEventListener('updateData', () => {
  // const course = CourseFile.get();
  // let summary = Score.summary(course);
  // row.value = ref(summary);
  console.log('button activated')
});
</script>

<style>
.q-page-container {
  padding-top: calc(0px + env(safe-area-inset-top, 0)) !important;
}
</style>
