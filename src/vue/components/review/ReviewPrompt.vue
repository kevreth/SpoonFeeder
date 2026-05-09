<template>
  <div class="review-prompt-overlay" data-cy="review-prompt">
    <div class="review-prompt-box">
      <p class="review-prompt-title">{{ title }}</p>
      <button
        v-if="scopeType !== 'course'"
        id="review-focused-btn"
        data-cy="review-focused"
        class="review-prompt-btn"
        @click="emit('start', 'focused')"
      >
        Review this {{ scopeTypeLabel }} ({{ focusedCount }} question{{
          focusedCount !== 1 ? 's' : ''
        }})
      </button>
      <button
        id="review-cumulative-btn"
        data-cy="review-cumulative"
        class="review-prompt-btn"
        @click="emit('start', scopeType === 'course' ? 'focused' : 'cumulative')"
      >
        {{
          scopeType === 'course'
            ? `Review the full course (${focusedCount} question${focusedCount !== 1 ? 's' : ''})`
            : `Review all content so far (${cumulativeCount} question${cumulativeCount !== 1 ? 's' : ''})`
        }}
      </button>
      <button id="review-skip-btn" data-cy="review-skip" class="review-prompt-btn review-skip" @click="emit('skip')">
        Skip
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ScopeType, ReviewType } from '../../../ts/main/review/reviewTypes';

const props = defineProps<{
  title: string;
  scopeType: ScopeType;
  focusedCount: number;
  cumulativeCount: number;
}>();

const emit = defineEmits<{
  skip: [];
  start: [type: ReviewType];
}>();

const scopeTypeLabel = computed(() => {
  if (props.scopeType === 'lesson') return 'lesson';
  if (props.scopeType === 'unit') return 'unit';
  return 'course';
});
</script>

<style scoped>
.review-prompt-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.55);
}

.review-prompt-box {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  max-width: 420px;
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.review-prompt-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 0.5rem;
}

.review-prompt-btn {
  padding: 0.6rem 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #f5f5f5;
  cursor: pointer;
  text-align: left;
  font-size: 0.95rem;
}

.review-prompt-btn:hover {
  background: #e8e8e8;
}

.review-skip {
  color: #666;
  font-style: italic;
}
</style>
