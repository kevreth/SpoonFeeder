import { beforeEach, describe, expect, it } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { useSlideStore } from '../../../vue/stores/slideStore';
import type { SlideInterface } from '../../main/slide/slideInterface';

function mockSlide(txt: string): SlideInterface {
  return { txt } as unknown as SlideInterface;
}

describe('useSlideStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('starts empty', () => {
    const store = useSlideStore();
    expect(store.currentSlide).toBeNull();
    expect(store.currentSlideType).toBeNull();
    expect(store.quizComplete).toBe(false);
  });

  it('setSlide updates both refs', () => {
    const store = useSlideStore();
    const slide = mockSlide('Q1');
    store.setSlide(slide, 'mc');
    expect(store.currentSlide).toBe(slide);
    expect(store.currentSlideType).toBe('mc');
  });

  it('setSlide clears a prior quizComplete flag', () => {
    const store = useSlideStore();
    store.setQuizComplete();
    expect(store.quizComplete).toBe(true);
    store.setSlide(mockSlide('Q2'), 'bool');
    expect(store.quizComplete).toBe(false);
  });

  it('setQuizComplete flips the flag; reset clears everything', () => {
    const store = useSlideStore();
    store.setSlide(mockSlide('Q3'), 'info');
    store.setQuizComplete();
    expect(store.quizComplete).toBe(true);
    store.reset();
    expect(store.currentSlide).toBeNull();
    expect(store.currentSlideType).toBeNull();
    expect(store.quizComplete).toBe(false);
  });
});
