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
  margin-right: 1.6vw;
  font-size: 6vw;
  top: 0;
}

.menuBtn .q-focus-helper {
  display: none !important;
}
@media screen and (min-width: 1200px) {
  .q-btn.menuBtn {
    font-size: 4vw;
  }
}
</style>
