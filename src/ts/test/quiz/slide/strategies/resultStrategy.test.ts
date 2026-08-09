import { describe, expect, it } from 'vitest';
import { Result } from '../../../../main/slidetype/strategies/resultStrategy';

// Characterization tests locking today's Result strategy behavior before
// ResultReturnType is widened for extended (partial-credit) SATA (PRD-004).

describe('Result.SIMPLE', () => {
  it('returns true for equal string answers', () => {
    expect(Result.SIMPLE('a', 'a')).toBe(true);
  });
  it('returns false for unequal string answers', () => {
    expect(Result.SIMPLE('a', 'b')).toBe(false);
  });
  it('returns true for equal arrays regardless of reference identity', () => {
    expect(Result.SIMPLE(['a', 'b'], ['a', 'b'])).toBe(true);
  });
  it('returns false for arrays with the same elements in different order', () => {
    expect(Result.SIMPLE(['a', 'b'], ['b', 'a'])).toBe(false);
  });
});

describe('Result.CORRELATED', () => {
  it('returns a boolean array comparing elements pairwise', () => {
    expect(Result.CORRELATED(['a', 'b', 'c'], ['a', 'x', 'c'])).toEqual([
      true,
      false,
      true,
    ]);
  });
  it('returns an empty array when res is null', () => {
    expect(Result.CORRELATED(['a', 'b'], null as unknown as string[])).toEqual([]);
  });
});

describe('Result.UNSUPPORTED', () => {
  it('throws', () => {
    expect(() => Result.UNSUPPORTED('a', 'b')).toThrow();
  });
});

describe('Result.PARTIAL', () => {
  it('returns 1 for a perfect match', () => {
    expect(Result.PARTIAL(['a', 'b'], ['a', 'b'])).toBe(1);
  });
  it('returns a fractional score for a partial match', () => {
    expect(Result.PARTIAL(['a', 'b', 'c'], ['a'])).toBeCloseTo(1 / 3);
  });
  it('subtracts credit for incorrect selections', () => {
    expect(Result.PARTIAL(['a', 'b'], ['a', 'b', 'x'])).toBeCloseTo(0.5);
  });
  it('floors at 0 rather than going negative', () => {
    expect(Result.PARTIAL(['a'], ['x', 'y', 'z'])).toBe(0);
  });
  it('returns 0 when nothing is selected', () => {
    expect(Result.PARTIAL(['a', 'b'], [])).toBe(0);
  });
  it('returns 0 when res is null', () => {
    expect(Result.PARTIAL(['a', 'b'], null as unknown as string[])).toBe(0);
  });
});
