<template>
  <q-btn
    flat
    dense
    size="200%"
    icon="menu"
    class="menuBtn q-mt-xs q-mr-sm q-pt-xs">

    <DropList></DropList>
  </q-btn>
</template>

<script setup lang="ts">
import DropList from './menubtn/droplist/DropList.vue';
</script>

<style>
.menuBtn {
  /* position: fixed; */
  right: 0;
}
</style>
