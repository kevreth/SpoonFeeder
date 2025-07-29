<template>
  <CourseSelector
    v-model="courseList"
    @closeInfo="courseList = false"
    :isEnable="isEnable"
  />
  <q-page class="wrapContent row items-center justify-evenly">
    <div id="slide">
      <div id="content" ref="contentRef"></div>
    </div>
  </q-page>

  <WelcomeScreen
    @play="courseList = true"
    :isEnable="isEnable"
    :content-ref="contentRef"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  loadCourseListing,
  switchCourse,
  COURSE_NAME,
  setCourseListing,
} from '../mediator';
import '../../css/style1.css';
import '../../css/quasar.css';
import CourseSelector from '../components/menuoverlay/menubtn/droplist/courseselector/CourseSelector.vue';
import WelcomeScreen from '../components/WelcomeScreen.vue';

const courseList = ref(false);
// const isEnable = ref(false);
const isEnable = ref(false);
const contentRef = ref<HTMLDivElement | null>(null);

//This should probably be moved to App.vue.
loadCourseListing((yml) => {
  setCourseListing(yml);
  initialize();
});
function initialize() {
  let courseName = COURSE_NAME.get();
  if (courseName == null || courseName == 'null') courseList.value = true;
  else switchCourse(courseName);
}
</script>

<style>
.wrapContent {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  /* white-space: nowrap; */
  max-height: 500px;
}
</style>
