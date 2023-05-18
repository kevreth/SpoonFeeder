<template>
  <q-menu
    id="droplist"
    class="text-white dropMenu"
    style="background: transparent;"
    v-model="droplist"
  >
    <q-list style="min-width: 30px" class="dropList bg-secondary" @click="droplist = false">
      <q-item clickable>
        <q-item-section @click="overlay = true" @keydown.esc="overlay = false">{{ $t('droplist.progress')}}</q-item-section>
      </q-item>
      <q-item clickable>
        <q-item-section @click="courseList = true">{{ $t('droplist.courses')}}</q-item-section>
      </q-item>
      <q-item clickable>
        <q-item-section>{{ $t('droplist.settings')}}</q-item-section>
      </q-item>
      <q-item clickable>
        <q-item-section>{{ $t('droplist.help')}}</q-item-section>
      </q-item>
    </q-list>
  </q-menu>

  <OverlayTable :isEnable="isEnable" v-model="overlay" @handleOverlay="handleOverlay"></OverlayTable>
  <CourseSelector :isEnable="isEnable" v-model="courseList"
  @closeInfo="courseList = false"></CourseSelector>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import OverlayTable from './overlaytable/OverlayTable.vue';
import CourseSelector from './courseselector/CourseSelector.vue';

// setting transition disable
const isEnable = ref(false);
// const isEnable = ref(true);

const droplist = ref(false);
const overlay = ref(false);
const courseList = ref(false);

// handle overlay pages
function handleOverlay() {
  overlay.value = !overlay.value;
}
</script>

<style>
.dropList {
  margin-right: 0.2em;
}
.dropMenu {
  font-size: 2vw;
  font-family: "Segoe UI", "SF Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  /* right: 15px; */
}
@media screen and (min-width: 1200px) {
  .dropMenu {
    font-size: 1.3vw;
  }
}
</style>
