<template>
  <div class="startOver">
    <button @click="startOver" class="startOverBtn">Start Over</button>
  </div>
</template>

<!-- <script setup>
  import startOver from '../composables/startOver';

  function startOver() {
      const { reloadPage } = startOver();
      return { reloadPage };
    }

</script> -->

<script>
import getStartOver from '../composables/startOver';

export default {
  data() {
    return {
      showOverlay: false,
    };
  },
  methods: {
    startOver() {
      const { clear, reload } = getStartOver();
      return { clear, reload };
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
  margin: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 2.5rem;
}
</style>
