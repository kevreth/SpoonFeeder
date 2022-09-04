<template>
    <div class="backdrop">
        <StartOver />
    </div>
</template>

<script>
import StartOver from "../components/StartOver.vue"

export default {
    name: "HamburgerOverlay",
    components: { StartOver }
}
</script>

<style scoped>
    .backdrop {
        width: 100%;
        height: 100%;
        top: 0;
        position: fixed;
        background: #1f1b24;
        /* opacity: 0.2; */
    }
</style>