<template>

  <q-item clickable @click.stop="isOverlayOpen = true">
    <q-item-section avatar class="dropListIcon">
      <q-icon name="settings" />
    </q-item-section>
    <q-item-section v-if="showLabel">{{
      $t('droplist.settings')
    }}</q-item-section>
  </q-item clickable>

  <SettingsOverlay v-model="isOverlayOpen" @closeInfo="isOverlayOpen = false" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SettingsOverlay from './menubtn/droplist/settings/SettingsOverlay.vue';

// Props
interface Props {
  showLabel?: boolean;
  size?: string;
}
const props = withDefaults(defineProps<Props>(), {
  showLabel: false,
  size: '1.4em',
});

const isOverlayOpen = ref(false);
</script>
