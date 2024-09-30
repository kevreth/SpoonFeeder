<template>
  <transition
    enter-active-class="animated slideInDown"
    leave-active-class="animated slideOutUp"
    :duration="1000"
  >
    <q-overlay class="column">
      <template #body>
        <div
          class="expContainer fixed-center"
          @keydown.esc="closeInfo"
          tabindex="0"
        >
          <span class="scrollable-content" v-html="content"></span>
          <ExitBtn class="q-mt-sm" @click="closeInfo" color="primary" />
        </div>
      </template>
    </q-overlay>
  </transition>
</template>

<script setup lang="ts">
import ExitBtn from '../common/ExitBtn.vue';

defineProps({
  content: {
    required: true,
  },
});

const emit = defineEmits(['closeInfo']);
function closeInfo() {
  emit('closeInfo');
}
</script>

<style>
.expContainer {
  /* border-radius: 20px;
  width: 70%;
  box-sizing: border-box;
  background: radial-gradient(circle at top, #1e1e2f, #0a0a16);
  color: #00ffea;
  border: 1px solid #333;
  box-shadow: 0 0 10px rgba(0, 255, 234, 0.75);
  background-color: #121212;
  padding: 20px; */

  background: rgba(0, 0, 0, 1);
  border: 1px solid #00bfff;
  box-shadow: 0 0 10px #00bfff, inset 0 0 20px rgba(0, 255, 0, 0.5);
  /* color: #fff; */
  padding: 20px;
  border-radius: 10px;
}
.scrollable-content {
  font-family: 'Segoe UI', 'SF Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  font-size: 1rem;
  text-align: left;
  padding: 10px 5px 5px 15px;
  display: block;
  position: relative;
  overflow: auto;
  max-height: 80vh;
}
</style>
