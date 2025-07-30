<template>
  <q-item clickable @click.stop="isOverlayOpen = true" style="top: 5px">
    <q-item-section avatar class="dropListIcon">
      <q-icon name="settings" />
    </q-item-section>
  </q-item>

  <SettingsOverlay v-model="isOverlayOpen" @closeInfo="isOverlayOpen = false" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SettingsOverlay from './menubtn/droplist/settings/SettingsOverlay.vue';

const isOverlayOpen = ref(false);
</script>
