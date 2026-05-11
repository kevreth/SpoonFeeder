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
    <div v-else class="review-quit-bar">
      <button id="review-quit-btn" data-cy="review-quit" class="review-quit-btn" @click="handleQuit">
        Quit review
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import type { SlideInterface } from '../../../ts/main/slide/slideInterface';
import type { ReviewBoundary, ReviewRecord, ReviewType, SlideResult } from '../../../ts/main/review/reviewTypes';
import { ReviewSessionController } from '../../../ts/main/review/reviewSessionController';
import { computeSlideResults } from '../../../ts/main/review/reviewSelector';
import { appClock } from '../../../ts/main/infrastructure/storage/storageInit';

const props = defineProps<{
  slides: SlideInterface[];
  boundary: ReviewBoundary;
  reviewType: ReviewType;
}>();

const emit = defineEmits<{
  complete: [record: ReviewRecord];
  quit: [];
}>();

const summaryVisible = ref(false);
const correctCount = ref(0);
const totalCount = ref(0);
const pct = computed(() =>
  totalCount.value > 0 ? Math.round((correctCount.value / totalCount.value) * 100) : 0,
);

let controller: ReviewSessionController | null = null;

onMounted(() => {
  controller = new ReviewSessionController(props.slides, (results: SlideResult[]) => {
    const { correct, total } = computeSlideResults(results);
    correctCount.value = correct;
    totalCount.value = total;
    summaryVisible.value = true;
  });
  controller.start(document);
});

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
  controller?.abort();
  emit('quit');
}
</script>

<style scoped>
.review-session-overlay {
  position: fixed;
  inset: 0;
  z-index: 900;
  pointer-events: none;
}

.review-quit-bar {
  position: absolute;
  top: 1rem;
  right: 1rem;
  pointer-events: all;
}

.review-quit-btn {
  padding: 0.4rem 0.8rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #fff3f3;
  cursor: pointer;
  font-size: 0.85rem;
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
