<template>
    <div class="backdrop">
        <div class="overlay">
            <button @click="startOver" class="startOver">Start Over</button>
            <a href="#" @click="closeOverlay">X</a>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        closeOverlay() {
            this.$emit('close');
        },
        startOver() {
            localStorage.clear();
            location.reload();
        }
    }
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