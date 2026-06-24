import type { AnswerType, SlideInterface } from '../slide/slideInterface';

/**
 * Pure correctness check for a slide given a user response. Reuses the slide's
 * existing result strategy (`Result.SIMPLE` → boolean, `Result.CORRELATED` →
 * boolean[]) without touching the DOM — unlike `slide.decorate(doc)`, which
 * is the legacy DOM-marking path. Vue exercise components call this to compute
 * the `correct` flag they emit with the `answer` event (PRD-001, ADR-019).
 *
 * Note: this sets `slide.res` as a side effect (the result strategy reads it),
 * which matches the subsequent `slide.setRes(selected)` in the answer handler.
 *
 * For correlated (gap) slides, "correct" means every gap is correct.
 */
export function evaluateAnswer(slide: SlideInterface, response: AnswerType): boolean {
  slide.setRes(response);
  const result = slide.result();
  if (Array.isArray(result)) {
    return result.length > 0 && result.every(Boolean);
  }
  return Boolean(result);
}
