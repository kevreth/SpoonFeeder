<template>
  <div @click.stop="isOverlayOpen = true" class="setting-icon-container">
    <q-icon name="settings" />
    <span v-if="showLabel" class="q-ml-sm">{{ $t('droplist.settings') }}</span>
  </div>

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
