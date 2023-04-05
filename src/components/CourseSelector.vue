<template>
  <transition appear group
  enter-active-class="animated zoomInUp"
  leave-active-class="animated zoomOutDown"
  >
  <q-overlay id="courseList">
    <template #body>        
      <q-list class="smaller-font fixed-center bg-secondary">
        <q-item clickable v-for="course in courses" :key="course">
          <q-item-label>{{ course }}</q-item-label>
        </q-item>
        <ExitBtn
            class="q-mt-sm"
            @click="closeInfo"
            color="primary"/>
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

const courses = ref(['javascript','typescript','aws', 'vue'])

const emit = defineEmits(['closeInfo'])
function closeInfo() {
  emit('closeInfo')
}
</script>