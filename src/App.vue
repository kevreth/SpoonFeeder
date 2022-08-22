<template>
    <HamburgerIcon />
    <div id="slide">
        <div id="content">
        </div>
    </div>    
</template>

<script>
import HamburgerIcon from "./components/HamburgerIcon.vue";
export default {
  name: "App",
  components: { HamburgerIcon },
  data() {
    return {
      title: "You did it",
    };
  },
};
</script>

<style></style>