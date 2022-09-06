<template>
    <div class="overlay">
        <a href="#" @click="closeOverlay" class="closeOverlay">X</a>
    </div>
    <StartOver />

</template>

<script>
import StartOver from "../components/StartOver.vue"

export default {
    name: "HamburgerOverlay",
    components: { StartOver },
    methods: {
        closeOverlay() {
        this.$emit("close");
    }}
}
</script>

<style>
.overlay {
  position: fixed;
  width: 70%;
  height: 70%;
  top: 17%;
  right: 15%;
  margin: 5px;
  background: #3a3a3a;
  opacity: 0.5;
  border-radius: 20px;
  box-shadow: 2px 5px 10px rgba(241, 225, 225, 0.3);
}
.blury {
  filter: blur(10px);
}
a {
  text-decoration: none;
}
.closeOverlay {
  color: rgb(253, 78, 78);
  position: absolute;
  top: 0;
  right: 0;
  padding: 5px 8px;
  margin: 5px 10px 0 0;
  transition: 0.3s;
  font-size: 56px;
}
.overlay a:hover, .overlay a:focus {
  color: red;
}
</style>
