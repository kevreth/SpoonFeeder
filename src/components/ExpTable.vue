<template>
  <transition
    enter-active-class="animated slideInDown"
    leave-active-class="animated slideOutUp"
    :duration="1000">
    <q-overlay class="column">
      <template #body>
        <div class="expContainer fixed-center bg-secondary" @keydown.esc="closeInfo" tabindex="0">
          <span class="scrollable-content" v-html="content"></span>
          <ExitBtn
            @click="closeInfo"
            color="primary"/>
        </div>
      </template>
    </q-overlay>
  </transition>
</template>

<script setup>
import ExitBtn from './ExitBtn.vue';
import { defineProps } from 'vue';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps({
  content: {
    required: true
  }
});

const emit = defineEmits(['closeInfo'])
function closeInfo() {
  emit('closeInfo')
}

</script>

<style>
.expContainer {
  border-radius: 20px;
  width: 70%;
  box-sizing: border-box;
}
.scrollable-content {
  font-family: "Segoe UI", "SF Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  font-size: 1rem;
  text-align: left;
  padding-left: 15px;
  display: block;
  position: relative;
  overflow: auto;
  max-height: 400px; /* Set the maximum height of the scrollable area */
}
@media screen and (max-width: 768px) {
  .scrollable-content {
    max-height: 100px;
  }
}

@media screen and (max-width: 480px) {
  .scrollable-content {
    max-height: 50px;
  }
}
</style>

