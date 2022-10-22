<template>
  <q-overlay
    class="infoOverlay"
  >
    <template #body>
      <div class="iconContainer">
        <!-- {{ content }} -->
        content
        <ExitBtn @click="closeInfo" />
      </div>

    </template>
  </q-overlay>
</template>

<script setup>
import ExitBtn from './ExitBtn.vue';

const emit = defineEmits(['closeInfo'])
function closeInfo() {
  emit('closeInfo')
}

</script>

<style>
.iconContainer {
  display: grid;
  background: blue;
  height: 70%;
}
</style>

