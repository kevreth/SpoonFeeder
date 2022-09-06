<template>
  <div class="startOver">
    <button @click="startOver" class="startOverBtn">Start Over</button>
  </div>
</template>

<script>
import startOver from "../composables/startOver";
import overlay from "../css/overlay.css"

export default {
  data() {
    return {
      showOverlay: false
    }
  },
  methods: {
    startOver() {
      const { reloadPage } = startOver();
      return { reloadPage }
    },
  }
};
</script>

<style></style>
