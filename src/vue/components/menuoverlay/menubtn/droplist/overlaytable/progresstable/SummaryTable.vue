<template>
  <transition :name="isEnable ? 'transitions' : ''" :duration="1000">
    <q-dialog
      v-model="showOverlay"
      class="summaryOverlay bg-secondary"
      :class="{ transition: isEnable }"
    >
      <template #body>
        <div class="justify-evenly summaryContainer">
          <!-- {{ content }} -->
        </div>

        <ExitBtn @click="closeSummary" />
      </template>
    </q-dialog>
  </transition>
</template>

<script setup lang="ts">
import ExitBtn from '../../../../../common/ExitBtn.vue';
import { ref } from 'vue';

defineProps({
  isEnable: {
    type: Boolean,
    default: true,
  },
});

const showOverlay = ref(true);
const emit = defineEmits(['closeSummary']);
function closeSummary() {
  emit('closeSummary');
  showOverlay.value = false;
}
</script>

<style>
.summaryContainer {
  display: flex;
  flex-direction: row;
  cursor: auto;
}
.fullscreen {
  border-radius: 8px !important;
}
</style>
