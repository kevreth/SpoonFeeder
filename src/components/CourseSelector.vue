<template>
  <transition appear group
  enter-active-class="animated zoomInUp"
  leave-active-class="animated zoomOutDown"
  >
  <q-overlay id="courseTable" @click.stop="">
    <template #body>
      <q-list id="courseList" class="smaller-font fixed-center bg-secondary courseList">
        <q-item :header="true" class="titleCourse" id="titleCourse">
          <q-item-label header>Course</q-item-label>
        </q-item>
        <div class="scrollable-course" id="courses">
          <q-item clickable v-for="course in courses" :key="course" id="wrapCourses">
            <q-item-section class="course" id="course">{{ course }}</q-item-section>
          </q-item>
        </div>
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
import { getCourseListing } from '../ts/main/utilities';

const courses = ref(getCourseListing());

// const courses = ref(['javascript','typescript','aws', 'vue', 1, 2, 3, 4, 5, 6, 7, 8, 9])

const emit = defineEmits(['closeInfo'])
function closeInfo() {
  emit('closeInfo')
}
</script>

<style>
.titleCourse {
  padding: 0 0 0 16px;
  position: sticky;
  top: 0;
}
.courseList {
  height: 85%;
  border-radius: 10px;
}
.scrollable-course {
  overflow: auto;
  height: 80%;
  max-height: 80vh;
}
</style>
