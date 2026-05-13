<template>
  <div class="review-menu-overlay" data-cy="review-menu">
    <div class="review-menu-box">
      <div class="review-menu-header">
        <span class="review-menu-title">Reviews</span>
        <button class="review-menu-close" data-cy="review-menu-close" @click="close">✕</button>
      </div>
      <div v-if="loading" class="review-menu-loading">Loading…</div>
      <div v-else-if="scopeItems.length === 0" class="review-menu-empty">No scopes found.</div>
      <div v-else class="review-menu-scopes">
        <div
          v-for="item in scopeItems"
          :key="item.boundary.scopeKey"
          class="review-scope-row"
          :class="{ 'review-scope-locked': item.locked }"
        >
          <div class="review-scope-left">
            <div class="review-scope-label">{{ item.label }}</div>
            <div v-if="!item.locked && item.mostRecent" class="review-scope-score">
              {{ item.mostRecent.correct }}/{{ item.mostRecent.total }}
              ({{ scorePct(item.mostRecent) }}%) · {{ item.reviewCount }}×
            </div>
          </div>
          <div class="review-scope-right">
            <span v-if="item.locked" class="review-lock-badge">Locked</span>
            <template v-else>
              <button
                v-if="item.boundary.scopeType !== 'course'"
                class="review-scope-btn"
                :data-cy="`review-launch-focused-${item.boundary.scopeKey}`"
                @click="launch(item.boundary, 'focused')"
              >
                {{ scopeLabel(item.boundary.scopeType) }} ({{ item.focusedCount }})
              </button>
              <button
                class="review-scope-btn"
                :data-cy="`review-launch-cumulative-${item.boundary.scopeKey}`"
                @click="launch(item.boundary, item.boundary.scopeType === 'course' ? 'focused' : 'cumulative')"
              >
                {{ item.boundary.scopeType === 'course' ? `Full course (${item.focusedCount})` : `All so far (${item.cumulativeCount})` }}
              </button>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { ReviewBoundary, ReviewRecord, ScopeType } from '../../../ts/main/review/reviewTypes';
import { SAMPLE_SIZES } from '../../../ts/main/review/reviewTypes';
import { buildBoundaryMap, countReviewableExercises } from '../../../ts/main/review/reviewExtractor';
import { getReviewRecords, getHighestReachedIndex } from '../../../ts/main/review/reviewStorage';
import { CourseFile } from '../../../ts/main/course/index';
import { COURSE_NAME } from '../../../ts/main/dataaccess/index';
import { reviewMenuOpen, reviewLaunchPending } from '../../composables/reviewMenuState';

interface ScopeItem {
  boundary: ReviewBoundary;
  locked: boolean;
  mostRecent: ReviewRecord | undefined;
  reviewCount: number;
  label: string;
  focusedCount: number;
  cumulativeCount: number;
}

const loading = ref(true);
const scopeItems = ref<ScopeItem[]>([]);

onMounted(async () => {
  const course = CourseFile.get();
  const courseName = COURSE_NAME.get();
  if (!course || !courseName) {
    loading.value = false;
    return;
  }

  const bmap = buildBoundaryMap(course);
  const highest = getHighestReachedIndex(courseName);
  const records = await getReviewRecords(courseName);

  scopeItems.value = bmap.map((boundary) => {
    const locked = highest < boundary.slideIndex;
    const forScope = records.filter((r) => r.scopeKey === boundary.scopeKey);
    const mostRecent = forScope.length > 0 ? forScope[forScope.length - 1] : undefined;
    const focusedRaw = countReviewableExercises(course, boundary, 'focused');
    const cumulativeRaw = countReviewableExercises(course, boundary, 'cumulative');
    return {
      boundary,
      locked,
      mostRecent,
      reviewCount: forScope.length,
      label: buildLabel(boundary),
      focusedCount: Math.min(focusedRaw, SAMPLE_SIZES[boundary.scopeType]),
      cumulativeCount: Math.min(cumulativeRaw, SAMPLE_SIZES[boundary.scopeType]),
    };
  });

  loading.value = false;
});

function buildLabel(boundary: ReviewBoundary): string {
  if (boundary.scopeType === 'lesson') {
    const n = (boundary.lessonIndex ?? 0) + 1;
    return `Lesson ${n} — ${boundary.lessonName ?? ''}`;
  }
  if (boundary.scopeType === 'unit') {
    const n = boundary.unitIndex + 1;
    return `Unit ${n} — ${boundary.unitName}`;
  }
  return 'Full Course';
}

function scopeLabel(scopeType: ScopeType): string {
  if (scopeType === 'lesson') return 'Lesson';
  if (scopeType === 'unit') return 'Unit';
  return 'Course';
}

function scorePct(record: ReviewRecord): number {
  return record.total > 0 ? Math.round((record.correct / record.total) * 100) : 0;
}

function launch(boundary: ReviewBoundary, type: 'focused' | 'cumulative'): void {
  reviewLaunchPending.value = { boundary, type };
  reviewMenuOpen.value = false;
}

function close(): void {
  reviewMenuOpen.value = false;
}
</script>

<style scoped>
.review-menu-overlay {
  position: fixed;
  inset: 0;
  z-index: 1100;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
}

.review-menu-box {
  background: rgba(10, 15, 25, 0.97);
  border: 1px solid rgba(0, 229, 255, 0.2);
  border-radius: 12px;
  padding: 1.5rem;
  width: min(480px, 92vw);
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
  overflow: hidden;
}

.review-menu-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.25rem;
}

.review-menu-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #e0e0e0;
  letter-spacing: 0.5px;
}

.review-menu-close {
  background: transparent;
  border: none;
  color: #888;
  font-size: 1rem;
  cursor: pointer;
  padding: 4px 6px;
  border-radius: 4px;
  line-height: 1;
}

.review-menu-close:hover {
  color: #ccc;
  background: rgba(255, 255, 255, 0.06);
}

.review-menu-loading,
.review-menu-empty {
  color: #888;
  font-size: 0.9rem;
  padding: 1rem 0;
  text-align: center;
}

.review-menu-scopes {
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.review-scope-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.75rem 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.review-scope-row:last-child {
  border-bottom: none;
}

.review-scope-left {
  flex: 1;
  min-width: 0;
}

.review-scope-label {
  font-size: 0.9rem;
  color: #ccc;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.review-scope-locked .review-scope-label {
  color: #555;
}

.review-scope-score {
  font-size: 0.78rem;
  color: #888;
  margin-top: 2px;
}

.review-scope-right {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
}

.review-lock-badge {
  font-size: 0.75rem;
  color: #555;
  font-style: italic;
}

.review-scope-btn {
  padding: 0.35rem 0.7rem;
  border: 1px solid rgba(0, 191, 255, 0.3);
  border-radius: 4px;
  background: transparent;
  color: #00bfff;
  cursor: pointer;
  font-size: 0.78rem;
  white-space: nowrap;
  transition: background 0.15s, border-color 0.15s;
}

.review-scope-btn:hover {
  background: rgba(0, 191, 255, 0.1);
  border-color: rgba(0, 191, 255, 0.6);
}
</style>
