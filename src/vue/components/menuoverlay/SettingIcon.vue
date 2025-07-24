<template>
  <!-- <div @click="openOverlay" class="setting-icon"> -->
  <q-btn
    flat
    round
    dense
    icon="settings"
    aria-label="Settings"
    lass="dropListIcon"
    @click="settingOverlay = true"
  />

  <span v-if="props.showLabel" class="setting-label">
    {{ $t('droplist.settings') }}
  </span>
  <!-- </div> -->

  <SettingsOverlay
    v-model="settingOverlay"
    :title="props.showLabel ? $t('droplist.settings') : null"
    @closeInfo="settingOverlay = false"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SettingsOverlay from './menubtn/droplist/settings/SettingsOverlay.vue';

// Props
interface Props {
  showLabel?: boolean; // Whether to show text next to icon
}
const props = withDefaults(defineProps<Props>(), {
  showLabel: false, // Default: hide label
});

// Reactive
const settingOverlay = ref(false);

// Open overlay
const openOverlay = () => {
  settingOverlay.value = true;
};
</script>
