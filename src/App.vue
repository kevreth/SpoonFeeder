<template>
    <HamburgerIcon @click="toggleIcon"/>
    <teleport to=".overlays" v-if="showOverlay">
      <HamburgerOverlay @close="toggleIcon"/>      
    </teleport>
    <div id="slide">
        <div id="content">
        </div>
    </div> 
</template>

<script>
import HamburgerIcon from "./components/HamburgerIcon.vue";
import HamburgerOverlay from "./views/HamburgerOverlay.vue"
export default {
  name: "App",
  components: { HamburgerIcon, HamburgerOverlay },
  data() {
    return {
      showOverlay: false
    }
  },
  methods: {
    toggleIcon() {
      this.showOverlay = !this.showOverlay
    }
  }
};
</script>

<style></style>