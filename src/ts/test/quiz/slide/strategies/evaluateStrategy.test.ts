import { describe, expect, it } from 'vitest';
import { Evaluate } from '../../../../main/slidetype/strategies/evaluateStrategy';

// Characterization tests locking today's Evaluate strategy behavior before
// EvaluateType is widened for extended (partial-credit) SATA (PRD-004).

describe('Evaluate.DEFAULT', () => {
  it('returns an empty, zeroed Evaluation', () => {
    const result = Evaluate.DEFAULT();
    expect(result.responses).toBe(0);
    expect(result.correct).toBe(0);
    expect(result.text).toBe('');
  });
});

describe('Evaluate.SIMPLE', () => {
  it('counts a correct answer', () => {
    const result = Evaluate.SIMPLE('q', 'a', 'c', true);
    expect(result.responses).toBe(1);
    expect(result.correct).toBe(1);
    expect(result.text).toContain('row-correct');
  });
  it('counts an incorrect answer', () => {
    const result = Evaluate.SIMPLE('q', 'a', 'c', false);
    expect(result.responses).toBe(1);
    expect(result.correct).toBe(0);
    expect(result.text).toContain('row-wrong');
  });
  it('treats a null response as unanswered (0 responses)', () => {
    const result = Evaluate.SIMPLE('q', 'a', null as unknown as string, false);
    expect(result.responses).toBe(0);
    expect(result.correct).toBe(0);
  });
});

describe('Evaluate.SELECT', () => {
  it('highlights response and answer words by 1-based index', () => {
    // Positional args bind as (txt, ans, res, result) despite the type
    // alias's parameter names — ans=[2] (correct word is "cat"),
    // res=[2, 3] (user picked "cat" and "sat").
    const result = Evaluate.SELECT('the cat sat', [2], [2, 3], false);
    expect(result.responses).toBe(1);
    expect(result.correct).toBe(0);
    expect(result.text).toBe(
      '<tr class="row-wrong"><td>the cat sat</td>' +
        '<td class="sum-response">the <span class="sf-select-correct">cat</span> ' +
        '<span class="sf-select-wrong">sat</span></td>' +
        '<td class="sum-answer">the <span class="sf-select-correct">cat</span> sat</td></tr>'
    );
  });
});

describe('Evaluate.PARTIAL', () => {
  it('carries the fractional score through as the correct count', () => {
    const result = Evaluate.PARTIAL('q', ['a', 'b', 'c'], ['a'], 1 / 3);
    expect(result.responses).toBe(1);
    expect(result.correct).toBeCloseTo(1 / 3);
    expect(result.text).toContain('row-wrong');
  });
  it('marks full credit (1) as a correct row', () => {
    const result = Evaluate.PARTIAL('q', ['a', 'b'], ['a', 'b'], 1);
    expect(result.correct).toBe(1);
    expect(result.text).toContain('row-correct');
  });
  it('treats a null response as unanswered (0 responses)', () => {
    const result = Evaluate.PARTIAL('q', ['a'], null as unknown as string[], 0);
    expect(result.responses).toBe(0);
  });
});

describe('Evaluate.GAP', () => {
  it('accumulates one row per gap with rowspan on the first row', () => {
    const result = Evaluate.GAP(
      'The ___ in ___.',
      ['plain', 'Spain'],
      ['rain', 'Spain'],
      [false, true]
    );
    expect(result.responses).toBe(2);
    expect(result.correct).toBe(1);
    expect(result.text).toBe(
      '<tr class="row-wrong"><td rowspan="2">The ___ in ___.</td>' +
        '<td class="sum-response"><span class="ans-pill">rain</span></td>' +
        '<td class="sum-answer">plain</td></tr>\n' +
        '<tr class="row-correct"><td class="sum-response"><span class="ans-pill">Spain</span></td>' +
        '<td class="sum-answer">Spain</td></tr>'
    );
  });
});
