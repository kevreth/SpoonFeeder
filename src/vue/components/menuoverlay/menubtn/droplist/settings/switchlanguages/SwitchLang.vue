<template>
  <q-btn flat round icon="translate" class="q-pa-none q-ma-none">
    <LangOptions v-model="langOptions" />
  </q-btn>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import LangOptions from './LangOptions.vue';

const langOptions = defineModel('langOptions');
</script>
