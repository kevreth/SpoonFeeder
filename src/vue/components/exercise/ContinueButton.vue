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
  background: var(--sf-color-surface);
  color: var(--sf-color-on-surface);
  border: 1px solid var(--sf-color-primary);
  border-radius: var(--sf-radius-button);
  box-shadow:
    0 2px 6px rgba(0, 0, 0, 0.5),
    0 4px 8px rgba(0, 0, 0, 0.15);
  font-family: 'Orbitron', sans-serif;
  font-size: 1em;
  letter-spacing: 0.4em;
  font-weight: bold;
  align-self: center;
  min-height: var(--sf-min-touch);
  padding: 0 24px;
  opacity: 1;
  transition: opacity var(--sf-transition-appear);
}

.sf-continue-btn--hidden {
  visibility: hidden;
  pointer-events: none;
}
</style>
