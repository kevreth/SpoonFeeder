<template>
  <div class="welcome-screen" v-if="isContentEmpty">
    <div class="spoonfeeder-logo">
      <img
        src="../../img/spoonfeeder-logo.jpg"
        alt="SpoonFeeder logo"
        width="100"
        height="100"
      />

      <h1 class="spoonfeeder-text">Spoonfeeder</h1>
      <p class="slogan">Perpetual learning</p>
    </div>

    <q-btn
      class="green-btn start-btn"
      color="primary"
      label="START LEARNING"
      @click="courseList = true"
    />
  </div>

  <CourseSelector
    :isEnable="isEnable"
    v-model="courseList"
    @closeInfo="courseList = false"
  />
</template>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue';
import CourseSelector from './menuoverlay/menubtn/droplist/courseselector/CourseSelector.vue';

interface Props {
  contentRef: HTMLElement | null;
  isEnable?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  isEnable: true,
});

const courseList = ref(false);
const isContentEmpty = ref(true);

defineEmits(['play']);

// Watch for changes to contentRef and its children

let observer: MutationObserver | null = null;

watch(
  () => props.contentRef,
  (newEl) => {
    if (newEl) {
      // Initial check
      isContentEmpty.value = !newEl.hasChildNodes();

      // Clean up previous observer if any
      observer?.disconnect();

      // Create a new observer
      observer = new MutationObserver(() => {
        isContentEmpty.value = !props.contentRef?.hasChildNodes();
      });

      observer.observe(newEl, {
        childList: true,
        subtree: true,
        characterData: true,
      });
    }
  },
  { immediate: true },
);

// ✅ Cleanup when component unmounts
onBeforeUnmount(() => {
  observer?.disconnect();
});
</script>

<style>
.welcome-screen {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.spoonfeeder-logo {
  padding-bottom: 50px;
}
.spoonfeeder-text {
  font-weight: 700;
  font-size: 3.5rem;
  color: #0ff;
  padding: 0;
  margin: 0;
}
.slogan {
  font-weight: 400;
}
.start-btn {
  width: 80%;
}
</style>
