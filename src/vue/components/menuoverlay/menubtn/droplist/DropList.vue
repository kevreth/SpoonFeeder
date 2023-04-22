<template>
  <q-menu
    id="droplist"
    class=" text-white"
    style="background: black;"
    v-model="droplist"
  >
    <q-list style="min-width: 30px" class="smaller-font bg-secondary" @click="droplist = false">
      <q-item clickable>
        <q-item-section @click="overlay = true" @keydown.esc="overlay = false">Progress</q-item-section>
      </q-item>
      <q-item clickable>
        <q-item-section @click="courseList = true">Courses</q-item-section>
      </q-item>
      <q-item clickable>
        <q-item-section>Settings</q-item-section>
      </q-item>
      <q-item clickable>
        <q-item-section>Help</q-item-section>
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
// const isEnable = ref(true);
const isEnable = ref(false);

const droplist = ref(false);
const overlay = ref(false);
const courseList = ref(false);

// handle overlay pages
function handleOverlay() {
  overlay.value = !overlay.value;
}
</script>

<style>
.smaller-font {
  font-size: 16px;
  font-family: "Segoe UI", "SF Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  line-height: 0;
  /* background: #212026; */
}
</style>
