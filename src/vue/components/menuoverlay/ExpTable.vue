<template>
  <transition
    enter-active-class="animated slideInDown"
    leave-active-class="animated slideOutUp"
    :duration="1000"
  >
    <q-dialog v-model="showOverlay" class="column">
      <!-- <template #body> -->
      <div
        class="expContainer fixed-center"
        @keydown.esc="closeInfo"
        tabindex="0"
      >
        <span class="scrollable-content" v-html="content"></span>
        <ExitBtn class="q-mt-sm" @click="closeInfo" color="primary" />
      </div>
      <!-- </template> -->
    </q-dialog>
  </transition>
</template>

<script setup lang="ts">
import ExitBtn from '../common/ExitBtn.vue';
import { ref } from 'vue';

defineProps({
  content: {
    required: true,
  },
});

const showOverlay = ref(true);
const emit = defineEmits(['closeInfo']);

function closeInfo() {
  emit('closeInfo');
  showOverlay.value = false;
}
</script>

<style>
.expContainer {
  background: rgba(0, 0, 0, 1);
  border: 1px solid #00bfff;
  box-shadow:
    0 0 10px #00bfff,
    inset 0 0 20px rgba(0, 255, 0, 0.5);
  padding: 20px;
  border-radius: 10px;
  width: 100vw;
  z-index: 2;
}
.scrollable-content {
  font-family:
    'Segoe UI',
    'SF Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Helvetica,
    Arial,
    sans-serif;
  font-size: 1rem;
  text-align: left;
  padding: 10px 5px 5px 15px;
  display: block;
  position: relative;
  overflow: auto;
  max-height: 80vh;
}

@media (min-width: 768px) {
  .expContainer {
    width: 60vw;
  }
}
</style>
