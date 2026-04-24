<template>
  <q-btn flat dense icon="menu" class="menuBtn q-mt-xs q-mr-sm q-pt-xs">
    <DropList @keyDeleted="emit('keyDeleted')"></DropList>
  </q-btn>
</template>

<script setup lang="ts">
import DropList from './menubtn/droplist/DropList.vue';

const emit = defineEmits(['keyDeleted']);
</script>

<style>
.menuBtn {
  /* margin-right: 1.6vw; */
  /* font-size: 6vw; */
  font-size: 1.2rem;
  padding: 4px;
  background: transparent !important;
}

.menuBtn .q-focus-helper {
  display: none !important;
}

@media (min-width: 768px) {
  .menuBtn {
    font-size: 1.4rem;
  }
}
</style>
