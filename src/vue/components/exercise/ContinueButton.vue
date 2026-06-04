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
  background: var(--sf-color-primary);
  color: var(--sf-color-surface);
  border-radius: var(--sf-radius-button);
  font-weight: bold;
  min-height: var(--sf-min-touch);
  opacity: 1;
  transition: opacity var(--sf-transition-appear);
}

/* Hidden state: not interactive, faded out. Use display:none-equivalent
   collapse so it does not occupy layout while invisible. */
.sf-continue-btn--hidden {
  display: none;
}
</style>
