<template>
  <HamburgerIcon 
    @click="toggleIcon" 
    :class="{'blury': showOverlay}"
  />

  <teleport 
    to=".overlays"
    v-if="showOverlay"
  >
    <HamburgerOverlay @close="toggleIcon"/>      
  </teleport>

  <div 
    id="slide" 
    :class="{'blury': showOverlay}"
  >
      <div id="content"></div>
  </div>

</template>

<script>
import HamburgerIcon from "../components/HamburgerIcon.vue";
import HamburgerOverlay from "./HamburgerOverlay.vue"

export default {
  components: { HamburgerOverlay, HamburgerIcon  },
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

}
</script>

<style>
  #content {
    top:50%;
    left:50%;
    transform: translate(-50%, -50%);
    position: absolute;
  }
</style>