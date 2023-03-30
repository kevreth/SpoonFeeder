<template>
  <div class="q-pa-md">
    <div class="q-gutter-md">

      <q-btn color="black" icon="menu">
        <q-menu class="bg-purple text-white">
          <q-list style="min-width: 100px">
            <q-item clickable>
              <q-item-section @click="overlay = true" @keydown.esc="overlay = false">New tab</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
        <OverlayTable v-model="overlay" @handleOverlay="handleOverlay"></OverlayTable>

      </q-btn>

    </div>
  </div>
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
