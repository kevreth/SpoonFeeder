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
import { MUTE } from '../../../ts/main/dataaccess/mediator';
import { AudioPlayer } from '../../mediator';

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
  const player = new AudioPlayer(new Audio, MUTE);
  if (!props.volume) {
    player.muteAudio();
  } else if (props.volume) {
    player.playBack();
  }
}
</script>

<style>
.volumeMute {
  margin-top: 20px;
  height: 20px;
  z-index: 1;
  padding: 2px;
  font-size: 1em !important;
}
</style>
