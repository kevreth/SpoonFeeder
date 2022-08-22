<template>
  <h1>{{ title }}</h1>
    <HamburgerIcon />
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