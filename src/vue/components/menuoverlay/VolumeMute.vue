<template>
  <q-btn
    flat
    dense
    :icon="isMuted ? 'volume_off' : 'volume_up'"
    class="volumeMute q-ml-sm q-pt-md"
    @click="toggleVolume"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { MUTE } from '../../../ts/main/dataaccess/index';
import { AudioPlayer } from '../../mediator';

const props = defineProps({
  volume: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['toggle-volume']);

const isMuted = ref(false);

onMounted(() => {
  isMuted.value = MUTE.is();
});

function toggleVolume() {
  emit('toggle-volume');
  soundControl();
  // mute()
}

function soundControl() {
  const player = new AudioPlayer(new Audio(), MUTE);
  if (!isMuted.value) {
    isMuted.value = true;
    player.muteAudio();
  } else {
    isMuted.value = false;
    player.playBack();
  }
}
</script>

<style>
.volumeMute {
  position: fixed;
  left: 0;
  top: 0;
  z-index: -1;
}
.volumeMute:hover {
  transform: scale(1.2);
}
</style>
