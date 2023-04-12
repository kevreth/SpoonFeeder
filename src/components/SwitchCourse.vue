<template>
  <q-btn
    id="btn_switch"
    class="switchBtn q-mb-sm q-mr-sm q-ml-xs bg-primary"
    label="switch"
    @click="switchCourse()"
  />
</template>

<script setup>
import { onMounted, ref } from 'vue';

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
  const prevSelectedCourse = ref(null);
  onMounted(() => {
    prevSelectedCourse.value = props.selectedCourse
  })

  function switchCourse() {
    if (props.selectedCourse && props.selectedCourse !== prevSelectedCourse.value ) {
      props.selectCourse(props.selectedCourse);
      emit('closeInfo');
    }
  }

</script>
