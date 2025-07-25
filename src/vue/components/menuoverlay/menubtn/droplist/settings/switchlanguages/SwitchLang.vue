<template>
  <q-btn
    flat
    round
    icon="translate"
    @click="langOptions = true"
    class="q-pa-none q-ma-none"
  >
    <LangOptions v-model="langOptions" @click="langOptions = false" />
  </q-btn>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import LangOptions from './LangOptions.vue';

const langOptions = ref(false);
</script>
