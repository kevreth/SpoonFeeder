<template>
  <q-btn
    v-if="data.enabled"
    flat
    dense
    class="spoonyIcon q-pt-md"
    @click="emit('open-spoony')"
  >
    <img :src="botSvg" class="spoony-img" alt="Spoony" />
  </q-btn>
</template>

<script setup lang="ts">
import { getSpoonyData } from '../../composables/spoonyData';
import botSvg from 'src/img/bot.svg';

const data = getSpoonyData();
const emit = defineEmits(['open-spoony']);
</script>

<style>
/* .spoonyIcon {
  position: fixed;
  left: 40px;
  top: 0;
  z-index: -1;
  border: 1px solid rgba(0, 229, 255, 0.3);
} */

.spoonyIcon .spoony-img {
  width: 32px;
  height: 32px;
  border: 1px solid rgba(0, 229, 255, 0.3);
}
</style>
