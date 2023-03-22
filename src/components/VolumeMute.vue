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

<script setup>
// import { muteAudio } from '../ts/main/quiz/slide/audio';
import { muteCorrectAudio, muteWrongAudio, playAudio, playCorrectAudio, playWrongAudio } from '../ts/main/quiz/slide/audio';
// import { mute } from 'app/main/quiz/slide/audio';

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
    muteCorrectAudio()
    muteWrongAudio()
  } else {
    return true;
  }
}
</script>

<style>
.volumeMute {
  position: fixed;
  left: 0;
  font-size: 1em !important;
}
</style>