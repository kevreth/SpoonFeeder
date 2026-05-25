<template>
  <Transition name="continue-fade">
    <button
      v-if="visible"
      class="continueBtn"
      type="button"
      @click="$emit('click')"
    >continue</button>
  </Transition>
</template>

<script setup lang="ts">
defineProps<{
  visible: boolean;
}>();

defineEmits<{
  (e: 'click'): void;
}>();
</script>

<style scoped>
.continue-fade-enter-active {
  transition: opacity var(--sf-transition-appear), transform var(--sf-transition-appear);
}

.continue-fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
</style>
