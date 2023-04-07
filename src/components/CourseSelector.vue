<template>
  <transition appear group
  enter-active-class="animated zoomInUp"
  leave-active-class="animated zoomOutDown"
  >
  <q-overlay id="courseList" @click.stop="">
    <template #body>     
      <q-list class="smaller-font fixed-center bg-secondary scrollable-course">
        <q-item :header="true">
          <q-item-label header class="q-pa-none" style="position: sticky;">Course</q-item-label>
        </q-item>
        <q-item clickable v-for="course in courses" :key="course" class="scrollable-course">
          <q-item-section class="course">{{ course }}</q-item-section>
        </q-item>
        <div class="exitCourse">
          <ExitBtn
              
              @click="closeInfo"
              color="primary"/>

        </div>
      </q-list>
    </template>
  </q-overlay>
</transition>
</template>

<script setup>
import { ref } from 'vue';
import ExitBtn from './ExitBtn.vue';
// import { getCourseListing } from 'app/main/utilities';

// const courses = getCourseListing();
// function handleCourseList () {
//   courses.value = getCourseListing();
// };

const courses = ref(['javascript','typescript','aws', 'vue', 1, 2, 3, 4, 5, 6, 7, 8, 9])

const emit = defineEmits(['closeInfo'])
function closeInfo() {
  emit('closeInfo')
}
</script>

<style>
.course {
  padding: 0 !important;
  margin: 0;
}
.scrollable-course {
  /* display: block; */
  /* position:fixed; */
  overflow: auto;
  max-height: 80vh;
  border-radius: 10px;
  padding-right: 0;
  padding-left: 0;
  margin: 0 15px;
}
.exitCourse {
  position: sticky;
  bottom: 0;
}
</style>