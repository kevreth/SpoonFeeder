<template>
  <q-btn
    class="switchBtn q-mb-sm q-mr-sm q-ml-xs bg-primary"
    label="switch"
    @click="switchCourse()"
  />
</template>

<script setup>
  import { ref } from 'vue';

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

  function switchCourse() {
    if (props.selectedCourse) {
      props.selectCourse(props.selectedCourse);
      emit('closeInfo');
    }
  }

</script>
