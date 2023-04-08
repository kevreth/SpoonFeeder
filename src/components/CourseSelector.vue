<template>
  <transition appear group
    enter-active-class="animated zoomInUp"
    leave-active-class="animated zoomOutDown">
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
                id="course"                
              >
                {{ course }}
              </q-item-section>
            </q-item>
          </div>
          <div class="btnCourse">
            <SwitchCourse
              :selectCourse="selectCourse"
              :selectedCourse="selectedCourse"
              @closeInfo="closeInfo"
            />
            <ExitBtn
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
import { ref } from 'vue';
import ExitBtn from './ExitBtn.vue';
import { getCourseListing } from '../ts/main/utilities';
import SwitchCourse from './SwitchCourse.vue';

const courses = ref(getCourseListing());
const selectedCourse = ref(null);

function selectCourse(course) {
  selectedCourse.value = course
  console.log('selected course', selectedCourse)
}

// function closeTable() {
//   selectedCourse.value = null;
// }

const emit = defineEmits(['closeInfo'])
function closeInfo() {
  emit('closeInfo')
}
</script>

<style>
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
}
.scrollable-course {
  overflow: auto;
  height: 80%;
  max-height: 80vh;
}
</style>
