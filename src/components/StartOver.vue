<template>
  <q-btn
    @click="startOver"
    size="1em"
    class="bg-primary"
    label="Start Over"
  />
</template>

<script setup>
  import getStartOver from '../composables/startOver';

  function startOver() {
    const { clear, reload } = getStartOver();
    return { clear, reload };
    }

</script>

<style scoped>
.q-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid white;
  font-weight: bold;
}
.q-btn:hover {
  border-color: blue;
}
</style>
