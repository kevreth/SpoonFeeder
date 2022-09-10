<template>
  <div class="startOver">
    <button @click="startOver" class="startOverBtn">Start Over</button>
  </div>
</template>

<script>
import startOver from '../composables/startOver';

export default {
  data() {
    return {
      showOverlay: false,
    };
  },
  methods: {
    startOver() {
      const { reloadPage } = startOver();
      return { reloadPage };
    },
  },
};
</script>

<style scoped>
.startOver {
  line-height: 1px;
}
.startOverBtn {
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 8px 15px;
}
</style>
