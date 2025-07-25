<template>
  <q-dialog v-model="props.modelValue" :z-index="3" @click.stop>
    <div
      class="lang-dialog bg-primary text-white"
      style="border-radius: 20px; width: 90vw; max-width: 360px"
    >
      <!-- Header -->
      <div class="q-pa-sm text-center text-h6 text-uppercase">
        {{ $t('settingsContent.language') }}
      </div>

      <q-separator color="white" />

      <!-- Language List -->
      <q-list
        class="q-pt-sm"
        style="min-width: 200px; max-height: 240px; overflow-y: auto"
      >
        <q-item
          v-for="language in languages"
          :key="language.value"
          clickable
          v-ripple
          :class="[
            'relative-position',
            locale === language.value
              ? 'border-selected text-white'
              : 'text-dark-orange',
          ]"
          @click="locale = language.value"
        >
          <!-- Centered Text -->
          <q-item-section class="text-center">
            <q-item-label>{{ language.label }}</q-item-label>
          </q-item-section>

          <!-- Checkmark overlaid on the right (doesn't affect centering) -->
          <q-icon
            v-if="locale === language.value"
            name="check"
            size="sm"
            color="white"
            class="absolute-right q-mr-sm"
            style="top: 50%; transform: translateY(-50%)"
          />
        </q-item>
      </q-list>

      <!-- Close Button (Top Right) -->
      <div class="q-pa-md q-pt-none">
        <ExitBtn @click="closeDialog" />
      </div>
    </div>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import ExitBtn from '../../../../../common/ExitBtn.vue';

const i18n = useI18n();
const locale = ref(i18n.locale.value);

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

const languages = [
  { value: 'en-US', label: 'English' },
  { value: 'zh-CN', label: '中文' },
  { value: 'zh-TW', label: '漢語' },
  { value: 'fr-FR', label: 'Français' },
  { value: 'de-DE', label: 'Deutsch' },
];

// Save locale when changed
watch(locale, (newLocale) => {
  localStorage.setItem('locale', newLocale);
  i18n.locale.value = newLocale;
});

function closeDialog() {
  emit('update:modelValue', false);
}
</script>

<style>
.text-dark-orange {
  color: #ff8c00 !important;
}
.border-selected {
  border: 2px solid white;
  border-radius: 10px;
  margin: 0 8px;
  background-color: rgba(255, 255, 255, 0.1);
}
.lang-dialog {
  position: relative;
  padding: 0;
  /* font-family: 'Roboto', sans-serif; */
}
</style>
