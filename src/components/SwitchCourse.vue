<template>
  <q-btn
    v-if="courseSelected"
    class="switchBtn q-mb-sm q-mr-sm q-ml-xs bg-primary"
    label="switch"
    @click="switchCourse()"
  />
</template>

<script setup>
  import { ref, watchEffect } from 'vue';

  const props = defineProps({
    selectCourse: {
      type: Function,
      required: true
    },
    selectedCourse: {
      required: true
    }
  })
  const emit = defineEmits(['closeInfo']);

  const courseSelected = ref(false);

  function switchCourse() {
    props.selectCourse(props.selectedCourse);
    emit('closeInfo');
  }

  watchEffect(() => {
    if(props.selectedCourse) {
      courseSelected.value = true;
    }
  })
</script>
