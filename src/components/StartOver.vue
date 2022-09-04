<template>
  <div class="overlay">
    <button @click="startOver" class="startOver">Start Over</button>
    <a href="#" @click="closeOverlay">X</a>
  </div>
</template>

<script>
import startOver from "../composables/startOver";

export default {
  methods: {
    closeOverlay() {
      this.$emit("close");
    },
    startOver() {
      const { reloadPage } = startOver();
      return { reloadPage }
    },
  }
};
</script>

<style></style>
