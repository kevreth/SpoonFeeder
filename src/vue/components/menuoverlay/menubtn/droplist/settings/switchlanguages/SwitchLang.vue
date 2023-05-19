<template>
  <q-btn flat round icon="translate">
      <q-menu class="langOptions">
        <q-list style="min-width: 100px">
          <q-item v-model="locale" @click="locale=language.value" clickable v-close-popup v-for="language in languages" :key="language.value" style="position: relative; z-index: 1;">
            <q-item-section>{{ language.label}}</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { locale } = useI18n({ useScope: 'global' });

const languages = [
  { value: 'en-US', label: 'English' },
  { value: 'zh-CN', label: '中文' }
];
</script>

<style>
.langOptions {
  /* background: black; */
  color: black;
  z-index: 7000;
}
</style>