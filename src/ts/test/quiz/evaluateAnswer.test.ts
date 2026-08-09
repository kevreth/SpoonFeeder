import { expect, it, vi } from 'vitest';
import type { AnswerType, SlideInterface } from '../../main/slide/slideInterface';
import { evaluateAnswer } from '../../main/quiz/evaluateAnswer';

// Characterization tests locking today's live pass/fail collapse behavior
// before ResultReturnType is widened for extended (partial-credit) SATA
// (PRD-004). evaluateAnswer only calls setRes()/result() on the slide it's
// given, so a minimal fake is sufficient.
function fakeSlide(resultValue: boolean | boolean[] | number): SlideInterface {
  return {
    setRes: vi.fn(),
    result: vi.fn(() => resultValue),
  } as unknown as SlideInterface;
}

it('returns true for a simple (boolean) correct result', () => {
  const slide = fakeSlide(true);
  expect(evaluateAnswer(slide, 'a' as AnswerType)).toBe(true);
});

it('returns false for a simple (boolean) incorrect result', () => {
  const slide = fakeSlide(false);
  expect(evaluateAnswer(slide, 'a' as AnswerType)).toBe(false);
});

it('returns true for a correlated (array) result only when every element is true', () => {
  const slide = fakeSlide([true, true, true]);
  expect(evaluateAnswer(slide, ['a', 'b', 'c'] as AnswerType)).toBe(true);
});

it('returns false for a correlated (array) result with any false element', () => {
  const slide = fakeSlide([true, false, true]);
  expect(evaluateAnswer(slide, ['a', 'b', 'c'] as AnswerType)).toBe(false);
});

it('returns false for an empty correlated (array) result', () => {
  const slide = fakeSlide([]);
  expect(evaluateAnswer(slide, [] as unknown as AnswerType)).toBe(false);
});

it('returns true for a partial-credit (number) result only at full credit (1)', () => {
  const slide = fakeSlide(1);
  expect(evaluateAnswer(slide, ['a', 'b'] as AnswerType)).toBe(true);
});

it('returns false for a partial-credit (number) result below full credit', () => {
  const slide = fakeSlide(0.5);
  expect(evaluateAnswer(slide, ['a'] as AnswerType)).toBe(false);
});

it('returns false for a partial-credit (number) result of 0', () => {
  const slide = fakeSlide(0);
  expect(evaluateAnswer(slide, [] as unknown as AnswerType)).toBe(false);
});

it('sets the response on the slide before reading the result', () => {
  const slide = fakeSlide(true);
  evaluateAnswer(slide, 'picked' as AnswerType);
  expect(slide.setRes).toHaveBeenCalledWith('picked');
});
