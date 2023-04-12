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
            class="q-mt-sm"
            @click="closeInfo"
            color="primary"/>
        </div>
      </template>
    </q-overlay>
  </transition>
</template>

<script setup>
import ExitBtn from '../common/ExitBtn.vue';

defineProps({
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
  padding: 10px 5px 5px 15px;
  display: block;
  position: relative;
  overflow: auto;
  max-height: 80vh; /* Set the maximum height of the scrollable area */
}
</style>

