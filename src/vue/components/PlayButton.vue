<!-- components/PlayButton.vue -->
<template>
  <!-- Show Play button only if #content is empty -->
  <div v-if="isContentEmpty" class="play-btn-container">
    <q-btn
      class="play-btn"
      color="primary"
      icon="play_arrow"
      label="PLAY"
      @click="courseList = true"
    />
  </div>

  <!-- Course Selector -->
  <CourseSelector
    :isEnable="isEnable"
    v-model="courseList"
    @closeInfo="courseList = false"
  />
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import CourseSelector from './menuoverlay/menubtn/droplist/courseselector/CourseSelector.vue';

// Props
interface Props {
  contentRef: HTMLElement | null;
  isEnable?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  isEnable: true,
});

// Local state
const courseList = ref(false);
const isContentEmpty = ref(true);

// Watch for changes to contentRef and its children
watch(
  () => props.contentRef,
  (newEl) => {
    if (newEl) {
      // Initial check
      isContentEmpty.value = !newEl.hasChildNodes();

      // Watch for future changes
      const observer = new MutationObserver(() => {
        isContentEmpty.value = !props.contentRef?.hasChildNodes();
      });

      observer.observe(newEl, {
        childList: true,
        subtree: true,
        characterData: true,
      });

      // Cleanup on unwatch
      onMounted(() => {
        return () => {
          observer.disconnect();
        };
      });
    }
  },
  { immediate: true },
);
</script>

<style>
.play-btn {
  border: 1px solid #00bfff;
  /* box-shadow:
    0 0 10px #00bfff,
    inset 0 0 20px rgba(0, 255, 0, 0.5); */
  background-color: green !important;

  /* position: absolute;
  bottom: 200px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
  opacity: 1;
  transition: opacity 0.3s ease; */

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  opacity: 1;
  transition: opacity 0.3s ease;
}
</style>
