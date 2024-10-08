<template>
  <transition appear group :name="isEnable ? 'transitions' : ''">
    <q-overlay
      :class="{ transition: isEnable }"
      id="courseTable"
      class="courseTable"
      @click.stop=""
      z-index="3"
    >
      <template #body>
        <q-list
          id="courseList"
          class="courseList smaller-font fixed-center bg-course-list"
        >
          <q-item :header="true" class="titleCourse" id="titleCourse">
            <q-item-label header class="headerCourse q-pa-lg">{{
              $t('courseSelector.title')
            }}</q-item-label>
          </q-item>
          <div class="scrollable-course" id="courses">
            <q-item
              class="courseItem"
              clickable
              v-for="course in courses"
              :key="course"
              id="wrapCourses"
              @click="selectedCourse = course"
              :class="{ selected: course === selectedCourse }"
            >
              <q-item-section
                class="courseItemSection"
                :id="createValidHtmlId(course)"
              >
                <!-- {{ course.toUpperCase() }} -->
                {{
                  $t('courseSelector.course', { course: course.toUpperCase() })
                }}
              </q-item-section>
            </q-item>
          </div>
          <SavedCourse
            id="savedCourse"
            class="savedCourse"
            :savedCourse="savedCourse"
          ></SavedCourse>
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
import { getCourseData, switchCourse } from '../../../../../mediator';
import SwitchCourse from './SwitchCourse.vue';
import SavedCourse from './SavedCourse.vue';
import { createValidHtmlId } from '../../../../../composables/createValidHtmlId';
import ExitBtn from '../../../../common/ExitBtn.vue';

let courseData = ref(getCourseData());
let courses = ref(courseData.value.availableCourses);
const selectedCourse = ref<string | null>(null);
const savedCourse = ref<string>('');
const disableExit = ref(false);
// const disable = ref(false);
defineProps({
  isEnable: {
    type: Boolean,
    default: true,
  },
});

onBeforeUpdate(() => {
  courseData = ref(getCourseData());
  courses = ref(courseData.value.availableCourses);
});

function selectCourse(course: string): void {
  if (
    courseData.value.courseName === null ||
    courseData.value.courseName === undefined
  ) {
    disableExit.value = false;
  } else {
    disableExit.value = true;
    selectedCourse.value = course;
    savedCourse.value = selectedCourse.value;
    switchCourse(selectedCourse.value);
  }
}

const emit = defineEmits(['closeInfo']);

function closeInfo() {
  emit('closeInfo');
}
</script>

<style>
.courseItemSection {
  padding: 5px 0;
}
.btnCourse {
  position: relative;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0%);
}
.q-btn .btnCourse {
  line-height: 0.5em;
}
.savedCourse {
  margin: 0.4em;
  line-height: 1em;
}
.savedCourse span {
  font-weight: bold;
  color: #40b782;
  padding-right: 1em;
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
  width: 100%;
}
.q-btn .courseItem,
.q-item.courseItem {
  min-height: 3.5vw;
  line-height: 0em;
}

.courseList {
  background-color: rgba(15, 15, 30, 1);
  border: 1px solid rgba(100, 100, 255, 0.6);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  padding: 10px 0;
  width: 250px;
}
.scrollable-course {
  overflow: auto;
  max-height: 70vh;
}
@media (min-width: 768px) {
  .courseList {
    font-size: 1vw;
  }
  .savedCourse span,
  .courseTableBtn {
    font-size: 1vw;
  }
  .q-btn .courseItem,
  .q-item.courseItem {
    min-height: 2vw;
  }
  /* .courseTableBtn,
  .savedCourse span {
    font-size: 1.5vw;
  } */
}
</style>
