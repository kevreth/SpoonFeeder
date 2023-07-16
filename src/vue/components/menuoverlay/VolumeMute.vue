<template>
  <q-btn
    flat
    dense
    :icon="volume ? 'volume_off' : 'volume_up'"
    class="volumeMute q-ml-sm q-mt-lg"
    @click="toggleVolume"
  />
  <q-slider
    v-model="sliderValue"
    :min="0"
    :max="10"
    label
    color="white"
    class="q-ml-sm q-mt-lg"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { MUTE } from '../../../ts/main/dataaccess/mediator';
import { AudioPlayer } from '../../mediator';

const props = defineProps({
  volume: {
    type: Boolean,
    default: false
  }
});
const sliderValue = ref(6)
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
.q-slider__track {
  width: 10vw;
}
.q-slider__inner {
  background-color: gray;
}
.volumeMute {
  height: 20px;
  z-index: 1;
  padding: 2px;
  font-size: 2vw;
}
@media screen and (min-width: 1200px) {
  .volumeMute {
    font-size: 1vw
  }
}
.volumeMute:hover {
  transform: scale(1.2);
} 
</style>
