<template>
  <q-dialog v-model="props.modelValue" :z-index="3" @click.stop="">
    <div
      id="langOptions"
      class="fixed-center bg-primary"
      style="border-radius: 20px"
    >
      <div class="q-pa-sm">{{ $t('settingsContent.language') }}</div>
      <q-separator horizontal class="q-mx-sm bg-white" />
      <q-list style="min-width: 100px">
        <q-item
          v-model="locale"
          @click="locale = language.value"
          clickable
          v-close-popup
          v-for="language in languages"
          :key="language.value"
          style="position: relative; z-index: 1"
        >
          <q-item-section>{{ language.label }}</q-item-section>
        </q-item>
      </q-list>
      <ExitBtn class="bg-secondary" @click="closeDialog" />
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
];

watch(locale, (newLocale: string) => {
  localStorage.setItem('locale', newLocale);
  i18n.locale.value = newLocale;
});

function closeDialog() {
  emit('update:modelValue', false);
}
</script>
