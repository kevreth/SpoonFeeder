<template>
  <!-- <div class="q-pa-md row justify-around" style="max-width: 700px; width: 100%;"> -->

    <q-overlay v-model="settingOverlay" :z-index="5000" @click.stop="">
      <template #body>
        <!-- <div class="fullscreen row justify-evenly items-center"> -->
          <div class="iconContainer fixed-center bg-secondary" @keydown.esc="closeInfo" tabindex="0">
          <h5>Settings</h5>
          <q-separator horizontal inset class="q-mx-lg bg-white"/>
          
          <ExitBtn @click="closeInfo"/>
        </div>
      </template>
    </q-overlay>
  <!-- </div> -->
</template>

<script setup lang="ts">
import ExitBtn from '../../../../common/ExitBtn.vue';
import { ref } from 'vue';

const settingOverlay = ref(false);
const emit = defineEmits(['closeInfo']);
function closeInfo() {
  emit('closeInfo');
}
</script>
