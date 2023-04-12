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

<script setup>
import DropList from './menuoverlay/menubtn/droplist/DropList.vue';
</script>
