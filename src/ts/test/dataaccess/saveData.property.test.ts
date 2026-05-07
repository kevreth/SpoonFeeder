/**
 * Property tests for SaveData.
 *
 * These tests assert invariants that hold for arbitrary save sequences —
 * idempotency, schema shape, ordering guarantees.
 */
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { SaveData } from '../../main/dataaccess/saveData/saveData';
import { COURSE_NAME } from '../../main/dataaccess/webstorage/webStorage';
import type { AnswerType } from '../../main/slide/slideInterface';

// Reset storage between tests so SaveData.get() starts clean
beforeEach(() => {
  localStorage.clear();
  sessionStorage.clear();
  COURSE_NAME.set('test'); // registers via localSync adapter
});
afterEach(() => {
  localStorage.clear();
  sessionStorage.clear();
});

describe('SaveData — idempotency', () => {
  it('set twice with the same txt does not create a duplicate', async () => {
    await SaveData.set('slide-1', 'answer', false);
    await SaveData.set('slide-1', 'other', false);
    const saves = await SaveData.get();
    expect(saves.filter((s) => s.txt === 'slide-1')).toHaveLength(1);
  });

  it('set with empty txt is a no-op', async () => {
    await SaveData.set('', 'x', false);
    const saves = await SaveData.get();
    expect(saves).toHaveLength(0);
  });
});

describe('SaveData — schema shape', () => {
  it('every saved record has txt, result, ts, and cont fields', async () => {
    await SaveData.set('q1', 'ans1', false);
    await SaveData.set('q2', ['a', 'b'] as AnswerType, true);
    const saves = await SaveData.get();
    for (const s of saves) {
      expect(typeof s.txt).toBe('string');
      expect(s.txt.length).toBeGreaterThan(0);
      expect(s.result !== undefined).toBe(true);
      expect(typeof s.ts).toBe('string');
      expect(s.ts.length).toBe(14); // 'YYYYMMDDHHmmss'
      expect(typeof s.cont).toBe('boolean');
    }
  });

  it('timestamp string has numeric characters only', async () => {
    await SaveData.set('slide-ts', 'x', false);
    const saves = await SaveData.get();
    expect(saves[0].ts).toMatch(/^\d{14}$/);
  });
});

describe('SaveData — ordering and retrieval', () => {
  it('saves appear in insertion order', async () => {
    const txts = ['alpha', 'beta', 'gamma', 'delta'];
    for (const t of txts) {
      await SaveData.set(t, t, false);
    }
    const saves = await SaveData.get();
    expect(saves.map((s) => s.txt)).toEqual(txts);
  });

  it('doesExist returns true for all saved txts', async () => {
    const txts = ['p', 'q', 'r'];
    for (const t of txts) {
      await SaveData.set(t, t, false);
    }
    const saves = await SaveData.get();
    for (const t of txts) {
      expect(SaveData.doesExist(t, saves)).toBe(true);
    }
  });

  it('doesExist returns false for unsaved txts', async () => {
    await SaveData.set('present', 'x', false);
    const saves = await SaveData.get();
    expect(SaveData.doesExist('absent', saves)).toBe(false);
  });
});

describe('SaveData — setContinueTrue', () => {
  it('sets cont to true for the matching record', async () => {
    await SaveData.set('slide-c', 'response', false);
    let saves = await SaveData.get();
    expect(saves[0].cont).toBe(false);

    await SaveData.setContinueTrue('slide-c');
    saves = await SaveData.get();
    expect(saves[0].cont).toBe(true);
  });

  it('is a no-op for a non-existent txt', async () => {
    await SaveData.set('real', 'r', false);
    await SaveData.setContinueTrue('nonexistent');
    const saves = await SaveData.get();
    expect(saves).toHaveLength(1);
    expect(saves[0].cont).toBe(false);
  });
});

describe('SaveData — getResultsFromSaves (pure helper)', () => {
  it('returns the saved result for a matching slide', () => {
    const saves = [
      new SaveData('q1', 'answer1', '20240101000000', false),
      new SaveData('q2', ['a', 'b'] as AnswerType, '20240101000000', true),
    ];
    const slide = { txt: 'q2' } as Parameters<typeof SaveData.getResultsFromSaves>[0];
    expect(SaveData.getResultsFromSaves(slide, saves)).toEqual(['a', 'b']);
  });

  it('returns empty string for a slide with no matching save', () => {
    const saves = [new SaveData('q1', 'ans', '20240101000000', false)];
    const slide = { txt: 'missing' } as Parameters<typeof SaveData.getResultsFromSaves>[0];
    expect(SaveData.getResultsFromSaves(slide, saves)).toBe('');
  });
});
