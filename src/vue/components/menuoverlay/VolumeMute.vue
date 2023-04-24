<template>
  <q-btn
    flat
    dense
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
  height: 20px;
  z-index: 1;
  padding: 2px;
  top: -35px;
  font-size: 2.9vw;
}
@media screen and (min-width: 1200px) {
  .volumeMute {
    font-size: 1.9vw
  }
}
.volumeMute:hover {
  transform: scale(1.2);
} 
</style>
