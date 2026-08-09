<template>
  <div class="sf-group-banner" data-cy="group-banner">
    <div class="sf-group-progress" data-cy="group-progress">
      Item {{ slide.groupIndex }} of {{ slide.groupTotal }}
      <span v-if="slide.groupTag" class="sf-group-tag" data-cy="group-tag">
        &middot; {{ slide.groupTag }}
      </span>
    </div>
    <div
      v-if="slide.groupContext"
      class="sf-group-context"
      data-cy="group-context"
      v-html="slide.groupContext"
    ></div>
  </div>
</template>

<script setup lang="ts">
import type { SlideInterface } from '../../mediator';

defineProps<{ slide: SlideInterface }>();
</script>

<style scoped>
.sf-group-banner {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 10px 12px;
  margin-bottom: var(--sf-gap-answer);
  border: 1px solid var(--sf-color-token-border);
  border-radius: var(--sf-radius-token);
  background: var(--sf-color-surface-raised);
}
.sf-group-progress {
  font-size: 0.8em;
  opacity: 0.75;
}
.sf-group-tag {
  font-weight: bold;
}
.sf-group-context {
  font-size: 0.95em;
}
</style>
