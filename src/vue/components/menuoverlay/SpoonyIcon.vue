<template>
  <q-btn
    v-if="enabled"
    flat
    dense
    class="spoonyIcon q-pt-md"
    :style="!hasCourse ? 'opacity: 0.4' : ''"
    :disable="!hasCourse"
    @click="emit('open-spoony')"
  >
    <img :src="botSvg" class="spoony-img" alt="Spoony" />
  </q-btn>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { SPOONY_API_KEY, SPOONY_ENABLED } from '../../../ts/main/spoony/index';
import { COURSE_NAME } from '../../../ts/main/dataaccess/index';
import botSvg from 'src/img/bot.svg';

const enabled = SPOONY_ENABLED.get();
const isConfigured = computed(() => {
  const key = SPOONY_API_KEY.get();
  return key !== null && key.length > 0;
});
const hasCourse = computed(() => {
  const name = COURSE_NAME.get();
  return name !== null && name.length > 0;
});
const emit = defineEmits(['open-spoony']);
</script>

<style>
.spoonyIcon .spoony-img {
  width: 32px;
  height: 32px;
  border: 1px solid rgba(0, 229, 255, 0.3);
}
</style>
