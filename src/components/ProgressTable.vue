<template>
  <q-hierarchy
    class="hierarchy"
    dense
    :columns="columns"
    :data="data"
    :classes="classes"
    :dark="dark"
    :default-expand-all="(default_expand_all = true)"
  >
  </q-hierarchy>
</template>

<script setup>
import { ref } from 'vue';
import {Progress} from '../composables/progress';

const columns = ref(Progress.columns);
const data = ref(Progress.data);

const classes = ref('bg-secondary');
const dark = ref(true);
</script>

<style>
.hierarchy {
  display: inline-block;
  max-height: 100vh;
  overflow: auto;
  --scrollbarBG: #cfd8dc;
  --thumbBG: #686a6c;
  border-radius: 20px;
  margin: 0;
}
.hierarchy {
  scrollbar-color: var(--thumbBG) var(--scrollbarBG);
}
.hierarchy::-webkit-scrollbar-track {
  background: var(--scrollbarBG);
}
.hierarchy::-webkit-scrollbar-thumb {
  background-color: var(--thumbBG);
}
</style>
