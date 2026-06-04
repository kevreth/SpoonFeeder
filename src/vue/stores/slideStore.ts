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

  function setSlide(slide: SlideInterface, type: string): void {
    currentSlide.value = slide;
    currentSlideType.value = type;
    quizComplete.value = false;
  }

  function setQuizComplete(): void {
    quizComplete.value = true;
  }

  function reset(): void {
    currentSlide.value = null;
    currentSlideType.value = null;
    quizComplete.value = false;
  }

  return { currentSlide, currentSlideType, quizComplete, setSlide, setQuizComplete, reset };
});
