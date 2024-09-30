<template>
  <q-overlay :z-index="3" @click.stop="">
    <template #body>
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
        <ExitBtn class="bg-secondary" />
      </div>
    </template>
  </q-overlay>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import ExitBtn from '../../../../../common/ExitBtn.vue';

const i18n = useI18n();
const locale = ref(i18n.locale.value);

const languages = [
  { value: 'en-US', label: 'English' },
  { value: 'zh-CN', label: '中文' },
];

watch(locale, (newLocale: string) => {
  localStorage.setItem('locale', newLocale);
  i18n.locale.value = newLocale;
});
</script>
