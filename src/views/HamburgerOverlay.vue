<template>
    <div class="overlay">
        <a href="#" @click="closeOverlay" class="closeOverlay">X</a>
    </div>
    <StartOver />

</template>

<script>
import StartOver from "../components/StartOver.vue"
import overlay from "../css/overlay.css"

export default {
    name: "HamburgerOverlay",
    components: { StartOver },
    methods: {
        closeOverlay() {
        this.$emit("close");
    }}
}
</script>

<style></style>