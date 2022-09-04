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
    .overlay {
        width: 200px;
        padding: 25px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        position: relative;
        border-radius: 10px;
    }
    a {
        text-decoration: none;
        position: absolute;
        right: 0;
        top: 0;
        color: rgb(238, 123, 123);
    }
    .startOver {
        cursor: pointer;
    }
</style>