<template>
  <CourseSelector
    v-model="courseList"
    @closeInfo="courseList = false"
    :isEnable="isEnable"
  />
  <q-page class="wrapContent row items-center justify-evenly">
    <div id="slide">
      <div id="content"></div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  loadCourseListing,
  switchCourse,
  COURSE_NAME,
  setCourseListing,
} from '../mediator';
import CourseSelector from '../components/menuoverlay/menubtn/droplist/courseselector/CourseSelector.vue';

const courseList = ref(false);
// const isEnable = ref(false);
const isEnable = ref(false);

//This should probably be moved to App.vue.
loadCourseListing((yml) => {
  setCourseListing(yml);
  initialize();
});
function initialize() {
  const userChose = localStorage.getItem('userChoseCourse');
  let courseName = COURSE_NAME.get();

  console.log('savedCourse from localStorage:', courseName);
  console.log('DEFAULT_COURSE from env:', import.meta.env.DEFAULT_COURSE);
  console.log('userChoseCourse flag:', userChose);

  if (!userChose || courseName == null || courseName == 'null') {
    courseName = import.meta.env.DEFAULT_COURSE || 'test';
    console.log('falling back to:', courseName);
  }
  console.log('switching to course:', courseName);
  if (courseName) switchCourse(courseName);
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
@media (min-width: 768px) {
  .wrapContent {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
