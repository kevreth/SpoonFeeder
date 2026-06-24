import { defineStore } from 'pinia';
import { ref, shallowRef } from 'vue';
import type { SlideInterface } from '../../ts/main/slide/slideInterface';

/**
 * Reactive bridge between the framework-agnostic `SlideDispatcher`
 * (TS business logic) and the Vue presentation layer (PRD-001, ADR-019).
 *
 * Holds only transient view state — the current slide and its type, plus a
 * quiz-complete flag. Persistence stays in the TS `dataaccess/` layer; this
 * store never touches localStorage/sessionStorage.
 */
export const useSlideStore = defineStore('slide', () => {
  // shallowRef: the slide is a `Slide` class instance — reassignment drives
  // re-render, but we must not deep-proxy the instance (would wrap its methods).
  const currentSlide = shallowRef<SlideInterface | null>(null);
  const currentSlideType = ref<string | null>(null);
  const quizComplete = ref(false);
  // `restored` is true only on the DECORATE path — the slide was already
  // answered (page reload before "continue"). Exercise components use it to
  // render the post-answer state from `slide.res` instead of a fresh question.
  // It must NOT be inferred from `slide.res` alone: the NEXT path taints the
  // next slide's res/cont via fillMatchingSlide (see slideDispatcher.getSlide).
  const restored = ref(false);

  function setSlide(slide: SlideInterface, type: string, wasRestored = false): void {
    currentSlide.value = slide;
    currentSlideType.value = type;
    quizComplete.value = false;
    restored.value = wasRestored;
  }

  function setQuizComplete(): void {
    quizComplete.value = true;
  }

  function reset(): void {
    currentSlide.value = null;
    currentSlideType.value = null;
    quizComplete.value = false;
    restored.value = false;
  }

  return {
    currentSlide,
    currentSlideType,
    quizComplete,
    restored,
    setSlide,
    setQuizComplete,
    reset,
  };
});
