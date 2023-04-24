<template>
  <q-btn
    flat
    dense
    icon="menu"
    class="menuBtn q-mt-xs q-mr-sm q-pt-xs"
  >
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
  /* font-size: 6vw; */
  font-size: 6vw;
  top: 0;
}
@media screen and (min-width: 1200px) {
  .menuBtn {
    font-size: 4vw;
  }
}
</style>
