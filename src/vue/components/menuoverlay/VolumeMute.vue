<template>
  <div class="col text-left">
    <q-icon name="volume_up" size="sm" class="q-mr-sm" />
    <span class="text-body1">SFX</span>
  </div>
  <div class="col-auto">
    <q-toggle
      :model-value="!volume"
      color="blue"
      @update:model-value="onToggle"
    />
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { MUTE } from '../../../ts/main/dataaccess/mediator';
import { AudioPlayer } from '../../mediator';

const props = defineProps({
  volume: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits<{
  'update:volume': [value: boolean];
}>();

function onToggle(newVal: boolean) {
  emit('update:volume', !newVal);
}

watch(
  () => props.volume,
  (val) => {
    soundControl(val);
  },
  { immediate: true },
);

function soundControl(isMuted: boolean) {
  const player = new AudioPlayer(new Audio(), MUTE);
  if (isMuted) {
    player.muteAudio();
  } else {
    player.playBack();
  }
}
</script>
