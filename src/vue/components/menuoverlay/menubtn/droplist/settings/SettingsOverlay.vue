<template>
  <q-overlay v-model="settingOverlay" :z-index="5000" @click.stop="">
    <template #body>
      <OverlayCloseBtn id="closeBtn" @click="closeInfo"/>
      
      <SettingsContent></SettingsContent>
        <!-- <ExitBtn @click="closeInfo"/> -->
    </template>
  </q-overlay>
</template>

<script setup lang="ts">
// import ExitBtn from '../../../../common/ExitBtn.vue';
import { ref } from 'vue';
import OverlayCloseBtn from '../overlaytable/OverlayCloseBtn.vue';
import SettingsContent from './SettingsContent.vue'

const settingOverlay = ref(false);
const emit = defineEmits(['closeInfo']);
function closeInfo() {
  emit('closeInfo');
}
</script>


