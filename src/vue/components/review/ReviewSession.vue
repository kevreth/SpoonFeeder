<template>
  <div class="review-session-overlay" data-cy="review-session">
    <div v-if="summaryVisible" class="review-summary" data-cy="review-summary">
      <p class="review-summary-score">
        {{ correctCount }} / {{ totalCount }} correct ({{ pct }}%)
      </p>
      <button id="review-done-btn" data-cy="review-done" class="review-summary-btn" @click="handleDone">
        Return to course
      </button>
    </div>
    <div v-else class="review-active">
      <div class="review-quit-bar">
        <button id="review-quit-btn" data-cy="review-quit" class="review-quit-btn" @click="handleQuit">
          Quit review
        </button>
      </div>
      <div class="review-slide" data-cy="review-slide">
        <component
          :is="exerciseComponent"
          v-if="exerciseComponent && currentSlide"
          :key="currentIndex"
          :slide="currentSlide"
          :multiple="currentSlide.type === 'ma'"
          :restored="false"
          @continue="handleContinue"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, type Component } from 'vue';
import type { SlideInterface } from '../../../ts/main/slide/slideInterface';
import type { ReviewBoundary, ReviewRecord, ReviewType, SlideResult } from '../../../ts/main/review/reviewTypes';
import { computeSlideResults } from '../../../ts/main/review/reviewSelector';
import { appClock } from '../../../ts/main/infrastructure/storage/storageInit';
import { EXERCISE_COMPONENTS } from '../exercise/exerciseComponents';

const props = defineProps<{
  slides: SlideInterface[];
  boundary: ReviewBoundary;
  reviewType: ReviewType;
}>();

const emit = defineEmits<{
  complete: [record: ReviewRecord];
  quit: [];
}>();

// Review drives the same exercise components as the main quiz path, but holds
// its own slide index and result tally. Unlike the main path, review never
// calls slide.saveData() — answers must not mutate course progress (ADR-023).
const currentIndex = ref(0);
const results = ref<SlideResult[]>([]);
const summaryVisible = ref(false);
const correctCount = ref(0);
const totalCount = ref(0);
const pct = computed(() =>
  totalCount.value > 0 ? Math.round((correctCount.value / totalCount.value) * 100) : 0,
);

const currentSlide = computed<SlideInterface | null>(() => props.slides[currentIndex.value] ?? null);

const exerciseComponent = computed<Component | null>(() => {
  const type = currentSlide.value?.type;
  return type ? (EXERCISE_COMPONENTS[type] ?? null) : null;
});

// The exercise component has already called evaluateAnswer() (setting slide.res)
// by the time Continue fires, so slide.evaluate() reflects the user's response.
function handleContinue(): void {
  const slide = currentSlide.value;
  if (slide) {
    const evaluation = slide.evaluate();
    results.value.push({
      slideTxt: slide.txt,
      correct: evaluation.correct,
      total: evaluation.responses,
    });
  }
  if (currentIndex.value < props.slides.length - 1) {
    currentIndex.value++;
  } else {
    const { correct, total } = computeSlideResults(results.value);
    correctCount.value = correct;
    totalCount.value = total;
    summaryVisible.value = true;
  }
}

function handleDone(): void {
  const record: ReviewRecord = {
    scopeKey: props.boundary.scopeKey,
    scopeType: props.boundary.scopeType,
    unitIndex: props.boundary.unitIndex,
    unitName: props.boundary.unitName,
    lessonIndex: props.boundary.lessonIndex,
    lessonName: props.boundary.lessonName,
    reviewType: props.reviewType,
    date: appClock.now(),
    correct: correctCount.value,
    total: totalCount.value,
  };
  emit('complete', record);
}

function handleQuit(): void {
  emit('quit');
}
</script>

<style scoped>
.review-session-overlay {
  position: fixed;
  inset: 0;
  z-index: 900;
}

.review-active {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  background: var(--sf-color-surface);
  pointer-events: all;
}

.review-quit-bar {
  align-self: flex-end;
  padding: 1rem;
}

.review-quit-btn {
  padding: 0.4rem 0.8rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #fff3f3;
  cursor: pointer;
  font-size: 0.85rem;
}

.review-slide {
  flex: 1;
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  padding: 0 1rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  overflow-y: auto;
}

.review-summary {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: white;
  pointer-events: all;
}

.review-summary-score {
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.review-summary-btn {
  padding: 0.6rem 1.4rem;
  border: none;
  border-radius: 4px;
  background: #4a90e2;
  color: white;
  cursor: pointer;
  font-size: 1rem;
}

.review-summary-btn:hover {
  background: #357abd;
}
</style>
