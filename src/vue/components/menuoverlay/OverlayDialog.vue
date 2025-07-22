<
<template>
  <transition
    enter-active-class="animated slideInDown"
    leave-active-class="animated slideOutUp"
    :duration="1000"
  >
    <q-dialog v-model="visible" class="column">
      <div
        class="expContainer fixed-center"
        @keydown.esc="onCancel"
        tabindex="0"
      >
        <!-- Content: Info or Confirm Message -->
        <div class="scrollable-content q-px-md">
          <p
            v-if="isConfirm"
            class="q-ma-none text-center"
            v-html="confirmMessage"
          ></p>
          <div v-else v-html="content"></div>
        </div>

        <!-- Buttons -->
        <div class="row justify-around q-mt-lg full-width">
          <!-- Cancel / Close Button -->
          <ExitBtn
            class="col q-mx-sm"
            :label="cancelLabel"
            @click="onCancel"
            color="primary"
          />

          <!-- Confirm / Accept Start Over Button (only in confirm mode) -->
          <q-btn
            v-if="isConfirm"
            class="col q-mx-sm"
            :label="okLabel"
            @click="onConfirm"
            color="negative"
            data-cy="start-over-confirm"
          />
        </div>
      </div>
    </q-dialog>
  </transition>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import ExitBtn from '../common/ExitBtn.vue';

// === Props ===
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  content: {
    type: String,
    default: '',
  },
  confirmMessage: {
    type: String,
    default: 'Are you sure you want to start over?',
  },
  isConfirm: {
    type: Boolean,
    default: false,
  },
  okLabel: {
    type: String,
    default: 'Accept Start Over',
  },
  cancelLabel: {
    type: String,
    default: 'Close',
  },
});

// === Emits ===
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'confirm'): void;
  (e: 'cancel'): void;
}>();

// Sync with v-model
const visible = ref(props.modelValue);
watch(
  () => props.modelValue,
  (newVal) => {
    visible.value = newVal;
  },
);

// === Start Over Logic ===
function getStartOver() {
  return {
    clear: () => {
      console.log('Clearing app state...');
    },
    reload: () => {
      window.location.reload();
    },
  };
}

function startOver() {
  const { clear, reload } = getStartOver();
  clear();
  reload();
}

// === Event Handlers ===
function onCancel() {
  emit('cancel');
  emit('update:modelValue', false);
}

function onConfirm() {
  emit('confirm');
  startOver(); // 🔥 Actually perform start over
  emit('update:modelValue', false);
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
