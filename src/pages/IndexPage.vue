<template>
  <q-page class="row items-center justify-evenly">
    <CourseSelector v-model="courseList" @closeInfo="courseList = false"/>
    <div id="slide">
      <div id="content"></div>
    </div>
  </q-page>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import { loadCourseListing, switchCourse } from '../ts/main/quiz';
import {getCourseName, setCourseListing} from '../ts/main/utilities';
import '../css/style1.css';
import '../css/quasar.css'
import CourseSelector from 'src/components/CourseSelector.vue';
const courseList = ref(false);

loadCourseListing((yml) => {
  setCourseListing(yml);
  initialize();
});
function initialize() {
  let courseName = getCourseName();
  if (courseName == null || courseName == 'null') {
    courseList.value = true;
    // setCourseName('');
  }
  else switchCourse(courseName);
}
</script>
