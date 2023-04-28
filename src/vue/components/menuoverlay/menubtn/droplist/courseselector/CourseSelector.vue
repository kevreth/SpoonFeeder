<template>
  <transition appear group :name="isEnable ? 'transitions' : ''">
    <q-overlay
      :class="{'transition': isEnable}"
      id="courseTable"
      @click.stop=""
      z-index="7000">
      <template #body>
        <q-list
          id="courseList"
          class="courseList smaller-font fixed-center bg-secondary">
          <q-item
            :header="true"
            class="titleCourse"
            id="titleCourse"
          >
            <q-item-label header class="headerCourse">Course</q-item-label>
          </q-item>
          <div class="scrollable-course" id="courses">
            <q-item
              class="courseItem"
              clickable
              v-for="course in courses"
              :key="course"
              id="wrapCourses"
              @click="selectedCourse = course"
              :class="{ 'selected': course === selectedCourse }"
            >
              <q-item-section
                class="courseItemSection"
                :id="createValidHtmlId(course)"
              >
                {{ course.toUpperCase() }}
              </q-item-section>
            </q-item>
          </div>
          <SavedCourse id="savedCourse" class="savedCourse" :savedCourse="savedCourse"></SavedCourse>
          <div class="btnCourse">
            <SwitchCourse
              class="courseTableBtn"
              :selectCourse="selectCourse"
              :selectedCourse="selectedCourse"
              @closeInfo="closeInfo"
            />
            <ExitBtn
              class="courseTableBtn"
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

<script setup lang="ts">
import { ref, onBeforeUpdate } from 'vue';
import ExitBtn from '../../../../common/ExitBtn.vue';
import { getCourseData, switchCourse } from '../../../../../mediator';
import SwitchCourse from './SwitchCourse.vue'
import SavedCourse from './SavedCourse.vue';
import { createValidHtmlId } from '../../../../../composables/createValidHtmlId';

let courseData = ref(getCourseData());
let courses = ref(courseData.value.availableCourses);
const selectedCourse = ref<string | null>(null);
const savedCourse = ref<string>('');
const disableExit = ref(false);
// const disable = ref(false);
defineProps({
  isEnable: {
    type: Boolean,
    default: true
  }
})

onBeforeUpdate(() => {
  courseData = ref(getCourseData());
  courses = ref(courseData.value.availableCourses);
})

function selectCourse(course: string): void {
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
.q-btn.courseItem,
.q-item.courseItem {
  min-height: 1vw;
}
.btnCourse {
  position: relative;
  /* display: flex; */
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0%);

}
.savedCourse {
  margin-top: 8px;
  line-height: 1em;
}
.savedCourse span {
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
.q-btn .courseItem, .q-item .courseItem {
  min-height: 3em;
  line-height: 0em;
}
.courseTableBtn, .savedCourse span {
  font-size: 1.5vw;
}
.courseList {
  height: 85%;
  border-radius: 10px;
  padding: 0px;
  font-size: 1.5vw;
  font-weight: normal;
}
@media screen and (min-width: 1200px) {
  .courseList {
    font-size: 1vw;
  }
  .savedCourse span, .courseTableBtn {
    font-size: 1vw;
  }
}
.scrollable-course {
  overflow: auto;
  height: 77%;
  max-height: 80vh;
}
</style>
