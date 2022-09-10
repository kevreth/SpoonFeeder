<template>
  <q-page class="row items-center justify-evenly">
    <HamburgerIcon @click="toggleIcon" :class="{ blury: showOverlay }" />

    <teleport to=".overlays" v-if="showOverlay">
      <HamburgerOverlay @close="toggleIcon" />
    </teleport>

    <div id="slide" :class="{ blury: showOverlay }">
      <div id="content"></div>
    </div>
  </q-page>
</template>

<script>
import HamburgerIcon from '../components/HamburgerIcon.vue';
import HamburgerOverlay from '../components/HamburgerOverlay.vue';
import { slides } from '../ts/main/quiz';
import '../css/style1.css';
sessionStorage.clear();

//===========================================================================
// un-comment for TESTING
sessionStorage.setItem('random', 'false');
//===========================================================================
// const courseName = 'history';
const courseName = 'test';
slides(courseName, document);

export default {
  components: { HamburgerOverlay, HamburgerIcon },
  data() {
    return {
      showOverlay: false,
    };
  },
  methods: {
    toggleIcon() {
      this.showOverlay = !this.showOverlay;
    },
  },
};
</script>

<style>
#content {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
}
</style>
