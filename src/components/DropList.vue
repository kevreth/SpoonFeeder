<template>
    <q-menu id="droplist" class=" text-white" style="background: black;">
      <q-list style="min-width: 30px" class="smaller-font bg-secondary">
        <q-item clickable>
          <q-item-section @click="overlay = true" @keydown.esc="overlay = false">Progress</q-item-section>
        </q-item>
        <q-item clickable>
          <q-item-section>Settings</q-item-section>
        </q-item>
        <q-item clickable>
          <q-item-section>Help</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
    
    <OverlayTable v-model="overlay" @handleOverlay="handleOverlay"></OverlayTable>


</template>

<script setup>
import { ref } from 'vue';
import OverlayTable from './OverlayTable.vue';

const overlay = ref(false);

// handle overlay pages
function handleOverlay() {
  overlay.value = !overlay.value;
}
</script>

<style>
.smaller-font {
  font-size: 16px;
  font-family: "Segoe UI", "SF Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  /* background: #212026; */
}
</style>