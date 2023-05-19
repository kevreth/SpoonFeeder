<template>
  <q-overlay class="settingOverlay" v-model="settingOverlay" :z-index="5000" @click.stop="">
    <template #body>
      <div class="settings fixed-center bg-secondary">
        <div>Settings</div>
        <q-separator horizontal class="q-mx-sm bg-white"/>
        <div class="row q-pl-md">
          <p class="q-pt-md">Language</p>
          <SwitchLang></SwitchLang>
        </div>
        <ExitBtn style="z-index: -1000;" @click="closeInfo"/>
      </div>
    </template>
  </q-overlay>
</template>

<script setup lang="ts">
import ExitBtn from '../../../../common/ExitBtn.vue';
import { ref } from 'vue';
// import OverlayCloseBtn from '../overlaytable/OverlayCloseBtn.vue';
import SwitchLang from './switchlanguages/SwitchLang.vue'
import SettingsContent from './SettingsContent.vue'

const settingOverlay = ref(false);

const emit = defineEmits(['closeInfo']);
function closeInfo() {
  emit('closeInfo');
}
</script>

<style>
.q-btn .settingOverlay {
  line-height: 1em !important;
  font-weight: 900;
}
.settings {
  border-radius: 20px;
  /* width: 50%; */
  /* padding: 0 10px 0 20px; */
  padding: 0;
  margin: 0;
  font-size: 2vw;
}
</style>


