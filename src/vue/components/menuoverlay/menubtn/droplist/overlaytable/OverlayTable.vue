<template>
  <transition appear group :name="isEnable ? 'transitions-zoom' : ''">
    <q-dialog
      v-model="props.showOverlay"
      id="overlay"
      @click.stop=""
      :class="{ transition: isEnable }"
    >
      <!-- <template #body> -->
      <div
        id="overlayTable"
        class="overlayTable column"
        style="display: flex; flex-direction: column"
      >
        <div class="overlayBtn">
          <OverlayCloseBtn id="closeBtn" @click="closeOverlay" />
          <TrashBtn id="startOver" @click="askToStartOver" />

          <ConfirmStartOverDialog ref="confirmRef" />

          <!-- Confirmation Dialog -->
          <!-- <q-dialog v-model="showConfirm" persistent style="z-index: 10000">
            <q-card style="min-width: 300px" class="confirm fixed-center">
              <q-card-section>
                Are you sure you want to start over? You will lose your current
                progress.
              </q-card-section>

              <q-card-actions align="center" class="q-px-md">
                <q-btn
                  flat
                  label="Cancel"
                  color="primary"
                  v-close-popup
                  class="q-mb-sm q-mr-md highlight-btn bg-primary text-white"
                />
                <q-btn
                  flat
                  label="OK"
                  color="negative"
                  @click="handleOk"
                  class="q-mb-sm q-mr-xs highlight-btn bg-primary"
                />
              </q-card-actions>
            </q-card>
          </q-dialog> -->
        </div>

        <div
          id="progressBackground"
          class="progressBackground"
          style="flex-grow: 1"
        >
          <ProgressTable style="cursor: auto" />
        </div>
      </div>
      <!-- </template> -->
    </q-dialog>
  </transition>
</template>

<script setup lang="ts">
import OverlayCloseBtn from './OverlayCloseBtn.vue';
import ProgressTable from './progresstable/ProgressTable.vue';
import TrashBtn from './TrashBtn.vue';
// import getStartOver from '../../../../../composables/startOver';
// import { Dialog } from 'quasar';
import { ref } from 'vue';
import ConfirmStartOverDialog from '../../../ConfirmStartOverDialog.vue';

const props = defineProps({
  isEnable: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits<{
  (e: 'update:showOverlay', value: boolean): void;
  (e: 'handleOverlay'): void;
}>();

function closeOverlay() {
  emit('update:showOverlay', false);
  emit('handleOverlay');
}

// const showConfirm = ref(false);
// function handleOk() {
//   startOver();
//   showConfirm.value = false;
// }

// function handleCancel() {
//   console.log('User canceled the action');
// }

// start over functionality
const confirmRef = ref<InstanceType<typeof ConfirmStartOverDialog> | null>(
  null,
);

const askToStartOver = () => {
  // Make sure it's rendered
  if (confirmRef.value) {
    confirmRef.value.open();
  } else {
    console.warn('Dialog not available yet!');
  }
};

// function startOver() {
//   const { clear, reload } = getStartOver();
//   return { clear, reload };
// }
</script>

<style>
.overlayTable {
  /* height: 60%; */
  /* width: 80vw; */
  height: 90%;
}
@media screen and (min-width: 1200px) {
  /* .overlayTable {
    width: 60vw;
  } */
}
.progressBackground {
  height: 70%;
  /* border-radius: 10px; */
  overflow: auto;
  background: transparent;
  overflow-x: auto;
}
.overlayBtn {
  /* color: #fc3d08; */
  font-size: 1.7em;
  color: deeppink;
}
/* @media screen and (min-width: 1200px) {
  .overlayBtn {
    font-size: 1.2vw;
  }
} */
.animated {
  animation-duration: 1s;
}
</style>
