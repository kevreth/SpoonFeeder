<template>
  <q-btn flat dense icon="menu" class="menuBtn q-mt-xs q-mr-sm q-pt-xs">
    <DropList></DropList>
  </q-btn>
</template>

<script setup lang="ts">
import DropList from './menubtn/droplist/DropList.vue';
</script>

<style>
.menuBtn {
  position: fixed;
  right: 0;
  /* margin-right: 1.6vw; */
  /* font-size: 6vw; */
  font-size: 2rem;
  top: 0;
}

.menuBtn .q-focus-helper {
  display: none !important;
}

@media (min-width: 768px) {
  .menuBtn {
    font-size: 3rem;
  }
}
</style>
