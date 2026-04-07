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
        <div class="corner-tl"></div>
        <div class="corner-tr"></div>
        <div class="corner-bl"></div>
        <div class="corner-br"></div>
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
  background: rgba(8, 12, 28, 0.95) !important;
  border: none;
  box-shadow: none;
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

.corner-tl,
.corner-tr,
.corner-bl,
.corner-br {
  position: absolute;
  width: 22px;
  height: 22px;
  border-color: #00e5ff;
  border-style: solid;
  box-shadow: none;
  z-index: 2;
}
.corner-tl {
  top: 2px;
  left: 2px;
  border-width: 2px 0 0 2px;
}
.corner-tr {
  top: 2px;
  right: 2px;
  border-width: 2px 2px 0 0;
}
.corner-bl {
  bottom: 2px;
  left: 2px;
  border-width: 0 0 2px 2px;
}
.corner-br {
  bottom: 2px;
  right: 2px;
  border-width: 0 2px 2px 0;
}

.scrollable-content .answer-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-bottom: 12px;
}
.scrollable-content .info-cell {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 7px;
  padding: 8px 10px;
}
.scrollable-content .info-label {
  margin-bottom: 4px;
  display: block;
  text-transform: uppercase;
  font-size: 12px;
}
.scrollable-content .info-value-correct {
  color: #4ecca3;
}
.scrollable-content .info-value-wrong {
  color: #ff6b6b;
}
.scrollable-content .exp-box {
  background: rgba(0, 229, 255, 0.04);
  border: 1px solid rgba(0, 229, 255, 0.15);
  border-radius: 7px;
  padding: 10px 12px;
  margin-bottom: 12px;
}
.scrollable-content .section-label {
  opacity: 0.8;
  margin-bottom: 6px;
  display: block;
  color: #00e5ff;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
.scrollable-content .refs {
  margin-bottom: 12px;
}

.scrollable-content center {
  padding-bottom: 12px;
  margin-bottom: 14px;
  border-bottom: 1px solid rgba(0, 229, 255, 0.25);
  display: block;
  color: rgba(255, 255, 255, 0.9);
}

.expContainer .q-btn {
  background: transparent !important;
  border: 1.5px solid rgba(0, 229, 255, 0.5) !important;
  color: #00e5ff !important;
  border-radius: 6px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  display: block;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .expContainer {
    width: 60vw;
  }
}
</style>
