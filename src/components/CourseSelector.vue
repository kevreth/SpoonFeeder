<template>
  <transition appear group
    enter-active-class="animated slideInDown"
    leave-active-class="animated slideOutUp">
    <q-overlay
      id="courseTable"
      @click.stop="">
      <template #body>
        <q-list
          id="courseList"
          class="smaller-font fixed-center bg-secondary courseList">
          <q-item
            :header="true"
            class="titleCourse"
            id="titleCourse"
          >
            <q-item-label header class="headerCourse">Course</q-item-label>
          </q-item>
          <div class="scrollable-course" id="courses">
            <q-item
              clickable
              v-for="course in courses"
              :key="course"
              id="wrapCourses"
              @click="selectedCourse = course"
              :class="{ 'selected': course === selectedCourse }"
            >
              <q-item-section
                class="course"
                :id="createValidHtmlId(course)"
              >
                {{ course.toUpperCase() }}
              </q-item-section>
            </q-item>
          </div>
          <SavedCourse id="savedCourse" class="savedCourse" :savedCourse="savedCourse"></SavedCourse>
          <div class="btnCourse">
            <SwitchCourse
              :selectCourse="selectCourse"
              :selectedCourse="selectedCourse"
              @closeInfo="closeInfo"
            />
            <ExitBtn
                v-if="disableExit"
                @click="closeInfo"
                color="primary"
            />
          </div>
        </q-list>
      </template>
    </q-overlay>
  </transition>
</template>

<script setup>
import { ref, onBeforeUpdate } from 'vue';
import ExitBtn from './ExitBtn.vue';
import { getCourseData, createValidHtmlId } from '../ts/main/utilities';
import SwitchCourse from './SwitchCourse.vue';
import SavedCourse from './SavedCourse.vue';
import {switchCourse} from '../ts/main/quiz';

let courseData = ref(getCourseData());
let courses = ref(courseData.value.availableCourses);
const selectedCourse = ref(null);
const savedCourse = ref('');
const disableExit = ref(false);

onBeforeUpdate(() => {
  courseData = ref(getCourseData());
  courses = ref(courseData.value.availableCourses);
})

function selectCourse(course) {
  if(courseData.value.courseName === null || courseData.value.courseName === undefined) {
    disableExit.value = false;
  } else {
    disableExit.value = true;
    selectedCourse.value = course
    savedCourse.value = selectedCourse.value
    switchCourse(selectedCourse.value);
  }
}

const emit = defineEmits(['closeInfo']);

function closeInfo() {
  emit('closeInfo');
}
</script>

<style>
.btnCourse {
  position: absolute;
  display: flex;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0%);
}
.savedCourse {
  margin-top: 8px;
}
.savedCourse span {
  font-size: 12px;
  font-weight: bold;
  color: #40b782;
}
.selected {
  background: #3c3b41;
  color: #f2c037;
}
.titleCourse {
  padding: 0;
  position: sticky;
  top: 0;
}
.headerCourse {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.courseList {
  height: 85%;
  border-radius: 10px;
  padding: 0 15px;
}
.scrollable-course {
  overflow: auto;
  height: 70%;
  max-height: 80vh;
}
</style>
