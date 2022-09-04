<template>
  <div class="overlay">
    <button @click="startOver" class="startOver">Start Over</button>
  </div>
</template>

<script>
import startOver from "../composables/startOver";

export default {
  methods: {
    startOver() {
      const { reloadPage } = startOver();
      return { reloadPage }
    },
  }
};
</script>

<style>  
  .overlay {
        width: 200px;
        padding: 25px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        position: relative;
        border-radius: 10px;
    }
  .startOver {
        cursor: pointer;
    }
</style>
