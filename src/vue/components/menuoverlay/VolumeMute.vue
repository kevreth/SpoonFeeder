<template>
  <q-btn
    flat
    dense
    size="200%"
    :icon="volume ? 'volume_off' : 'volume_up'"
    class="volumeMute q-ml-sm q-pt-md"
    @click="toggleVolume"
  />
</template>

<script setup lang="ts">
import { muteAudio, playBack } from '../../mediator';

const props = defineProps({
  volume: {
    type: Boolean,
    default: false
  }
});
const emit = defineEmits(['toggle-volume'])
function toggleVolume() {
  emit('toggle-volume');
  soundControl();
  // mute()
}

function soundControl() {
  if (!props.volume) {
    muteAudio()
  } else if (props.volume) {
    playBack();
  }
}
</script>

<style>
.volumeMute {
  position: fixed;
  left: 220px;
  font-size: 1em !important;
}
</style>
