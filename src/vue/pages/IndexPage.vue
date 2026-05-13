<template>
  <CourseSelector
    v-model="courseList"
    @closeInfo="courseList = false"
    :isEnable="isEnable"
  />
  <ReviewPrompt
    v-if="showPrompt && currentBoundary"
    :title="promptTitle"
    :scope-type="currentBoundary.scopeType"
    :focused-count="focusedCount"
    :cumulative-count="cumulativeCount"
    @skip="onPromptChoice('skip')"
    @start="onPromptChoice"
  />
  <ReviewSession
    v-if="showSession && currentBoundary && reviewSlides.length > 0"
    :slides="reviewSlides"
    :boundary="currentBoundary"
    :review-type="currentReviewType"
    @complete="onSessionComplete"
    @quit="onSessionQuit"
  />
  <q-page class="wrapContent row items-center justify-evenly">
    <div id="slide">
      <div id="content"></div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
import {
  loadCourseListing,
  switchCourse,
  COURSE_NAME,
  setCourseListing,
  SaveData,
  CourseFile,
  buildBoundaryMap,
  extractPool,
  countReviewableExercises,
  sampleExercises,
  appendReviewRecord,
  clearDraftState,
  setPreAdvanceHook,
  setHighestReachedIndex,
} from '../mediator';
import type { ReviewBoundary, ReviewRecord, ReviewType } from '../mediator';
import { reviewLaunchPending } from '../composables/reviewMenuState';
import CourseSelector from '../components/menuoverlay/menubtn/droplist/courseselector/CourseSelector.vue';
import ReviewPrompt from '../components/review/ReviewPrompt.vue';
import ReviewSession from '../components/review/ReviewSession.vue';
import type { SlideInterface } from '../../ts/main/slide/slideInterface';
import { SAMPLE_SIZES } from '../../ts/main/review/reviewTypes';

const courseList = ref(false);
const isEnable = ref(false);

const showPrompt = ref(false);
const showSession = ref(false);
const currentBoundary = ref<ReviewBoundary | null>(null);
const currentReviewType = ref<ReviewType>('focused');
const reviewSlides = ref<SlideInterface[]>([]);
const focusedCount = ref(0);
const cumulativeCount = ref(0);
const promptTitle = ref('');

let _resolvePrompt: ((choice: 'skip' | ReviewType) => void) | null = null;
let _resolveSession: (() => void) | null = null;

function buildPromptTitle(boundary: ReviewBoundary): string {
  if (boundary.scopeType === 'lesson') {
    const n = (boundary.lessonIndex ?? 0) + 1;
    return `Lesson ${n} — ${boundary.lessonName ?? ''} complete.`;
  }
  if (boundary.scopeType === 'unit') {
    const n = boundary.unitIndex + 1;
    return `Unit ${n} — ${boundary.unitName} complete.`;
  }
  return 'Course complete.';
}

watch(reviewLaunchPending, async (req) => {
  if (!req) return;
  reviewLaunchPending.value = null;
  await runReviewSession(req.boundary, req.type);
});

setPreAdvanceHook(async (nextSlideIndex: number) => {
  const course = CourseFile.get();
  if (!course) return;

  const courseName = COURSE_NAME.get();
  if (courseName) setHighestReachedIndex(nextSlideIndex, courseName);

  const bmap = buildBoundaryMap(course);
  const matching = bmap.filter((b) => b.slideIndex === nextSlideIndex);
  if (matching.length === 0) return;

  for (const boundary of matching) {
    const focused = countReviewableExercises(course, boundary, 'focused');
    if (focused === 0) continue;

    const cumulative = countReviewableExercises(course, boundary, 'cumulative');
    focusedCount.value = Math.min(focused, SAMPLE_SIZES[boundary.scopeType]);
    cumulativeCount.value = Math.min(cumulative, SAMPLE_SIZES[boundary.scopeType]);
    promptTitle.value = buildPromptTitle(boundary);
    currentBoundary.value = boundary;

    const choice = await new Promise<'skip' | ReviewType>((resolve) => {
      _resolvePrompt = resolve;
      showPrompt.value = true;
    });

    showPrompt.value = false;
    await nextTick();
    if (choice === 'skip') continue;

    await runReviewSession(boundary, choice);
  }
});

function onPromptChoice(choice: 'skip' | ReviewType): void {
  _resolvePrompt?.(choice);
  _resolvePrompt = null;
}

async function runReviewSession(boundary: ReviewBoundary, type: ReviewType): Promise<void> {
  const course = CourseFile.get();
  const pool = extractPool(course, boundary, type);
  const saves = await SaveData.get();
  const sampled = sampleExercises(pool, saves, boundary.scopeType);
  reviewSlides.value = sampled;
  currentReviewType.value = type;
  currentBoundary.value = boundary;

  await new Promise<void>((resolve) => {
    _resolveSession = resolve;
    showSession.value = true;
  });
}

function onSessionComplete(record: ReviewRecord): void {
  showSession.value = false;
  const courseName = COURSE_NAME.get();
  if (courseName) void appendReviewRecord(record, courseName);
  _resolveSession?.();
  _resolveSession = null;
}

function onSessionQuit(): void {
  showSession.value = false;
  const courseName = COURSE_NAME.get();
  if (courseName) void clearDraftState(courseName);
  _resolveSession?.();
  _resolveSession = null;
}

loadCourseListing((yml) => {
  setCourseListing(yml);
  initialize();
});

function initialize() {
  const userChose = localStorage.getItem('userChoseCourse');
  let courseName = COURSE_NAME.get();

  console.log('savedCourse from localStorage:', courseName);
  console.log('DEFAULT_COURSE from env:', import.meta.env.DEFAULT_COURSE);
  console.log('userChoseCourse flag:', userChose);

  if (!userChose || courseName == null || courseName == 'null') {
    courseName = import.meta.env.DEFAULT_COURSE || 'test';
    console.log('falling back to:', courseName);
  }
  console.log('switching to course:', courseName);
  if (courseName) switchCourse(courseName);
}
</script>
