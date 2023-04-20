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
import { loadCourseListing, switchCourse, COURSE_NAME, COURSES } from '../mediator';
import '../../css/style1.css';
import '../../css/quasar.css'
import CourseSelector from '../components/menuoverlay/menubtn/droplist/courseselector/CourseSelector.vue';

const courseList = ref(false);

//This should probably be moved to App.vue.
loadCourseListing((yml) => {
  COURSES.set( JSON.stringify( yml ) )
  initialize();
});
function initialize() {
  let courseName = COURSE_NAME.get();
  if (courseName == null || courseName == 'null')
    courseList.value = true;
  else switchCourse(courseName);
}
</script>
