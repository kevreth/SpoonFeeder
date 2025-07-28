<template>
  <q-btn
    id="btn_switch"
    class="switchBtn green-btn q-mb-sm q-mr-sm q-ml-xs bg-primary"
    :label="$t('switchCourse.switch')"
    @click="switchCourse()"
  />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Ref } from 'vue';

const props = defineProps({
  selectCourse: {
    type: Function,
    required: true,
  },
  selectedCourse: {
    required: true,
  },
});
const emit = defineEmits(['closeInfo']);
const prevSelectedCourse: Ref<unknown> = ref(null);

onMounted(() => {
  prevSelectedCourse.value = props.selectedCourse;
});

function switchCourse() {
  if (
    props.selectedCourse &&
    props.selectedCourse !== prevSelectedCourse.value
  ) {
    props.selectCourse(props.selectedCourse);
    emit('closeInfo');
  }
}
</script>

<style>
.switchBtn {
  border: 1px solid rgba(0, 255, 255, 0.8);
  box-shadow: 0 0 5px #0ff;
}
.green-btn {
  border: 1px solid #00bfff;
  background-color: green !important;
}
</style>
