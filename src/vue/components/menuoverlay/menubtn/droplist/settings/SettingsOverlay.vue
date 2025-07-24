<template>
  <q-dialog
    v-model="showOverlay"
    class="settingOverlay"
    :z-index="3"
    @click.stop=""
  >
    <div class="settings fixed-center bg-secondary">
      <div class="q-pa-sm">{{ $t('settingsContent.title') }}</div>
      <q-separator horizontal class="q-mx-sm bg-white" />
      <div class="row q-pl-md">
        <div class="q-pt-lg q-pr-xl">
          {{ $t('settingsContent.language') }}
        </div>
        <SwitchLang class="q-ma-sm"></SwitchLang>
      </div>
      <ExitBtn @click="closeInfo" />
    </div>
  </q-dialog>
</template>

<script setup lang="ts">
import ExitBtn from '../../../../common/ExitBtn.vue';
import { ref } from 'vue';
// import OverlayCloseBtn from '../overlaytable/OverlayCloseBtn.vue';
import SwitchLang from './switchlanguages/SwitchLang.vue';

// const settingOverlay = ref(false);
const showOverlay = ref(true);

const emit = defineEmits(['closeInfo']);
function closeInfo() {
  emit('closeInfo');
  showOverlay.value = false;
}
</script>

<style>
.q-btn .settingOverlay {
  line-height: 1rem !important;
  font-weight: 900;
}
.settings {
  border-radius: 20px;
  padding: 0;
  margin: 0;
  font-size: 1rem;
}
</style>
