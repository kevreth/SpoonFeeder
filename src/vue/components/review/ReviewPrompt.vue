<template>
  <div class="review-prompt-overlay" data-cy="review-prompt">
    <div class="review-prompt-box">
      <div class="review-prompt-header">
        <p v-if="promptParts.eyebrow" class="review-prompt-eyebrow">{{ promptParts.eyebrow }}</p>
        <p class="review-prompt-title">{{ promptParts.heading }}</p>
      </div>
      <button
        v-if="scopeType !== 'course'"
        id="review-focused-btn"
        data-cy="review-focused"
        class="review-prompt-btn review-prompt-btn--primary"
        @click="emit('start', 'focused')"
      >
        <span class="review-prompt-btn-label">Review this {{ scopeTypeLabel }}</span>
        <span class="review-prompt-btn-count">{{ focusedQuestionLabel }}</span>
      </button>
      <button
        id="review-cumulative-btn"
        data-cy="review-cumulative"
        class="review-prompt-btn review-prompt-btn--secondary"
        @click="emit('start', scopeType === 'course' ? 'focused' : 'cumulative')"
      >
        <span class="review-prompt-btn-label">{{
          scopeType === 'course' ? 'Review the full course' : 'Review all content so far'
        }}</span>
        <span class="review-prompt-btn-count">{{ cumulativeQuestionLabel }}</span>
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

const promptParts = computed(() => {
  const dashIndex = props.title.indexOf(' — ');
  const raw = dashIndex === -1 ? { eyebrow: '', heading: props.title } : {
    eyebrow: props.title.slice(0, dashIndex),
    heading: props.title.slice(dashIndex + 3),
  };
  return {
    eyebrow: raw.eyebrow,
    heading: raw.heading.replace(/\.$/, ''),
  };
});

const focusedQuestionLabel = computed(
  () => `${props.focusedCount} question${props.focusedCount !== 1 ? 's' : ''}`
);

const cumulativeQuestionLabel = computed(() => {
  const count = props.scopeType === 'course' ? props.focusedCount : props.cumulativeCount;
  return `${count} question${count !== 1 ? 's' : ''}`;
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
  background: rgba(18, 24, 38, 0.72);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 0.5px solid rgba(140, 170, 220, 0.25);
  border-radius: 16px;
  padding: 2rem;
  max-width: 420px;
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  box-shadow:
    0 0 40px rgba(60, 120, 220, 0.12),
    0 8px 30px rgba(0, 0, 0, 0.5);
}

.review-prompt-header {
  margin: 0 0 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.review-prompt-eyebrow {
  margin: 0;
  text-transform: uppercase;
  color: #7d93b8;
  font-size: 11px;
  letter-spacing: 0.08em;
}

.review-prompt-title {
  margin: 0;
  color: #eaf2ff;
  font-size: 17px;
  font-weight: 500;
}

.review-prompt-btn {
  padding: 0.6rem 1rem;
  border-radius: 10px;
  cursor: pointer;
  text-align: left;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  width: 100%;
}

.review-prompt-btn-label {
  flex: 1;
}

.review-prompt-btn-count {
  flex-shrink: 0;
  color: #7d93b8;
  font-size: 0.8rem;
  font-style: normal;
}

.review-prompt-btn--primary {
  background: rgba(90, 200, 255, 0.1);
  border: 0.5px solid rgba(120, 210, 255, 0.35);
  color: #eaf2ff;
}

.review-prompt-btn--secondary {
  background: rgba(255, 255, 255, 0.04);
  border: 0.5px solid rgba(140, 170, 220, 0.2);
  color: #dbe6f7;
}

.review-skip {
  background: none;
  border: none;
  color: #6d7f9e;
  font-style: italic;
  justify-content: flex-start;
}
</style>
