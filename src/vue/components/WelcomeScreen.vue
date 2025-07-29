<template>
  <div class="welcome-screen">
    <div class="spoonfeeder-logo">
      <img
        src="https://github.com/kevreth/SpoonFeeder/assets/47391465/af633b8b-d0df-421b-a699-36f7a90abb19"
        alt="SpoonFeeder logo"
        width="100"
        height="100"
      />

      <h1 class="spoonfeeder-text">Spoonfeeder</h1>
      <p class="slogan">Perpetual learning</p>
    </div>

    <q-btn
      v-if="isContentEmpty"
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
import { ref, watch, onMounted } from 'vue';
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
