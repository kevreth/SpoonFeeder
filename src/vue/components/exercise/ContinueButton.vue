<template>
  <q-btn
    class="sf-continue-btn"
    :class="{ 'sf-continue-btn--hidden': !visible }"
    data-cy="continue"
    no-caps
    :label="label"
    @click="emit('click')"
  />
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    visible: boolean;
    label?: string;
  }>(),
  { label: 'Continue' }
);

const emit = defineEmits<{
  click: [];
}>();
</script>

<style scoped>
.sf-continue-btn {
  position: sticky;
  bottom: 0;
  background: var(--sf-color-primary);
  color: var(--sf-color-surface);
  border-radius: var(--sf-radius-button);
  font-family: 'Orbitron', sans-serif;
  font-size: 1em;
  letter-spacing: 0.4em;
  font-weight: bold;
  min-height: var(--sf-min-touch);
  opacity: 1;
  transition: opacity var(--sf-transition-appear);
}

.sf-continue-btn--hidden {
  visibility: hidden;
  pointer-events: none;
}
</style>
