import { describe, expect, it, beforeEach } from 'vitest';
import { Json } from '../../main/dataaccess/saveData/saveFile';
import type { SlideInterface } from '../../main/slide/slideInterface';

function makeSlide(txt: string): SlideInterface {
  return { txt } as unknown as SlideInterface;
}

const slides = [makeSlide('alpha'), makeSlide('beta'), makeSlide('gamma')];

beforeEach(() => {
  Json.set(slides);
});

describe('Json', () => {
  it('get() returns the slides set via set()', () => {
    expect(Json.get()).toBe(slides);
  });

  it('getFirstSlide() returns the first slide', () => {
    expect(Json.getFirstSlide().txt).toBe('alpha');
  });

  it('getMatchingSlide(0) returns the first slide', () => {
    expect(Json.getMatchingSlide(0).txt).toBe('alpha');
  });

  it('getMatchingSlide(2) returns the third slide', () => {
    expect(Json.getMatchingSlide(2).txt).toBe('gamma');
  });

  it('findMatchingSlide returns the correct index', () => {
    expect(Json.findMatchingSlide('beta')).toBe(1);
  });

  it('findMatchingSlide returns -1 for unknown txt', () => {
    expect(Json.findMatchingSlide('missing')).toBe(-1);
  });

  it('set() replaces previously set slides', () => {
    const newSlides = [makeSlide('x')];
    Json.set(newSlides);
    expect(Json.get()).toBe(newSlides);
    // restore
    Json.set(slides);
  });
});
