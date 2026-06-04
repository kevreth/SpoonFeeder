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
    <!-- Hidden audio element for answer feedback (replaces per-conclude Audio()) -->
    <audio ref="audioEl" data-cy="answer-audio" style="display: none"></audio>

    <!-- Main quiz end screen (replaces legacy doc.body.innerHTML = evaluate(...) + startOverButton) -->
    <div v-if="quizComplete" class="sf-end-screen" data-cy="end-screen">
      <div v-html="endScreenHtml"></div>
      <button id="startOver" class="startOver" type="button" data-cy="start-over" @click="reloadPage">
        Start Over
      </button>
    </div>

    <!--
      Main quiz slide surface. Converted exercise types render through the Vue
      <component> switcher; un-converted types fall back to the legacy
      makeSlides() renderer, which injects into #slide/#content (ADR-023 keeps
      these divs for the review renderer too). The switcher is hidden while a
      review session/prompt is active so the two renderers never overlap.
    -->
    <div v-show="!quizComplete" id="slide">
      <component
        :is="exerciseComponent"
        v-if="exerciseComponent && currentSlide && !showSession && !showPrompt"
        :key="currentSlide.txt"
        :slide="currentSlide"
        :multiple="currentSlideType === 'ma'"
        :restored="restored"
        @answer="handleAnswer"
        @continue="handleContinue"
      />
      <div id="content"></div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, computed, onMounted, type Component } from 'vue';
import { storeToRefs } from 'pinia';
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
  showSlides,
  Json,
  evaluate,
  postRender,
  hideExplainIcon,
  firePreAdvanceHook,
  AudioPlayer,
  MUTE,
} from '../mediator';
import type { ReviewBoundary, ReviewRecord, ReviewType, AnswerType } from '../mediator';
import { reviewLaunchPending } from '../composables/reviewMenuState';
import CourseSelector from '../components/menuoverlay/menubtn/droplist/courseselector/CourseSelector.vue';
import ReviewPrompt from '../components/review/ReviewPrompt.vue';
import ReviewSession from '../components/review/ReviewSession.vue';
import type { SlideInterface } from '../../ts/main/slide/slideInterface';
import { SAMPLE_SIZES } from '../../ts/main/review/reviewTypes';
import { useSlideStore } from '../stores/slideStore';
import reloadPage from '../composables/startOver';
import ChoiceExercise from '../components/exercise/ChoiceExercise.vue';
import InfoExercise from '../components/exercise/InfoExercise.vue';
import SelectExercise from '../components/exercise/SelectExercise.vue';
import GapExercise from '../components/exercise/GapExercise.vue';
import SortExercise from '../components/exercise/SortExercise.vue';
import ImapExercise from '../components/exercise/ImapExercise.vue';

/* ── Main quiz rendering (PRD-001, ADR-019) ─────────────────────────────────
 * The Pinia slide store is driven by SlideDispatcher. Converted exercise types
 * render through the <component :is="exerciseComponent"> switcher; un-converted
 * types fall back to the legacy makeSlides() DOM renderer (ADR-023) until their
 * phase converts them. Phase tasks add entries to EXERCISE_COMPONENTS.
 */
const slideStore = useSlideStore();
const { currentSlide, currentSlideType, quizComplete, restored } = storeToRefs(slideStore);

// Type → Vue component. Types not present here render via the legacy makeSlides
// fallback below. Phase tasks add entries as each type is converted.
const EXERCISE_COMPONENTS: Record<string, Component> = {
  mc: ChoiceExercise,
  bool: ChoiceExercise,
  ma: ChoiceExercise,
  info: InfoExercise,
  select: SelectExercise,
  gap: GapExercise,
  sort: SortExercise,
  imap: ImapExercise,
};

const exerciseComponent = computed<Component | null>(() => {
  const type = currentSlideType.value;
  return type ? (EXERCISE_COMPONENTS[type] ?? null) : null;
});

const audioEl = ref<HTMLAudioElement | null>(null);
let audioPlayer: AudioPlayer | null = null;

const showExplain = ref(false);
const explainText = ref('');
const endScreenHtml = computed(() => (quizComplete.value ? evaluate(Json.get()) : ''));

function clearLegacyContent(): void {
  const content = document.getElementById('content');
  if (content) content.innerHTML = '';
}

// Render the active slide. Converted types are rendered by the Vue switcher
// (we just clear any stale legacy DOM); un-converted types use makeSlides,
// reproducing the legacy dispatcher's begin/next (hideExplainIcon) and
// decorate (restore answered state via conclude) behaviour.
function renderCurrent(slide: SlideInterface | null): void {
  if (!slide) return;
  if (exerciseComponent.value) {
    clearLegacyContent();
    return;
  }
  slide.makeSlides(document);
  if (restored.value && !slide.immediateConclusion) {
    slide.conclude(document, slide.res as AnswerType, slide.txt);
  } else {
    hideExplainIcon(document);
  }
}

watch(currentSlide, (slide) => void nextTick(() => renderCurrent(slide)), { immediate: true });

// MathJax/highlight after the Vue end screen renders.
watch(quizComplete, (done) => {
  if (done) void nextTick(() => postRender(document));
});

function handleAnswer({ selected, correct }: { selected: AnswerType; correct: boolean }): void {
  const slide = currentSlide.value;
  if (!slide) return;
  slide.setRes(selected);
  // immediateConclusion slides (info) record a save but play no audio —
  // mirrors the legacy conclude2 path.
  if (!slide.immediateConclusion) audioPlayer?.playAudio(correct);
  void slide.saveData();
  showExplain.value = !!slide.exp;
  explainText.value = slide.exp ?? '';
}

async function handleContinue(): Promise<void> {
  const slide = currentSlide.value;
  if (!slide) return;
  const txt = slide.txt;
  showExplain.value = false;
  explainText.value = '';
  await SaveData.setContinueTrue(txt);
  const nextSlideIndex = Json.findMatchingSlide(txt) + 1;
  await firePreAdvanceHook(nextSlideIndex);
  await showSlides(document);
}

onMounted(() => {
  if (audioEl.value) audioPlayer = new AudioPlayer(audioEl.value, MUTE);
});

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
