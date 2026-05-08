/**
 * Property tests for dispatch2 / getQuizState.
 *
 * These tests assert invariants that should hold for arbitrary inputs —
 * not just the specific cases covered by the unit tests.
 */
import { describe, expect, it } from 'vitest';
import { getQuizState, dispatch2 } from '../../main/quiz/stateActionDispatcher';
import { SaveData } from '../../main/dataaccess/saveData/saveData';
import type { SlideInterface } from '../../main/slide/slideInterface';
import type { StateActions } from '../../main/quiz/stateActionDispatcher';

// Minimal stub that satisfies SlideInterface
function makeSlide(txt: string): SlideInterface {
  return { txt } as unknown as SlideInterface;
}

function makeSave(txt: string, cont: boolean): SaveData {
  return new SaveData(txt, '', '20240101000000', cont);
}

// A StateActions implementation that simply returns the state name
const echoActions: StateActions<string> = {
  begin: () => 'BEGIN',
  current: () => 'CURRENT',
  decorate: () => 'DECORATE',
  next: () => 'NEXT',
  end: () => 'END',
};

const VALID_STATES = ['BEGIN', 'CURRENT', 'DECORATE', 'NEXT', 'END'] as const;

describe('getQuizState — properties', () => {
  it('returns BEGIN when saves is empty', () => {
    const slides = [makeSlide('q1'), makeSlide('q2')];
    expect(getQuizState(slides, [], true)).toBe('BEGIN');
    expect(getQuizState(slides, [], false)).toBe('BEGIN');
  });

  it('always returns a valid QuizState', () => {
    // Generate a variety of (slides, saves, advance) combinations
    const cases: Array<[SlideInterface[], SaveData[], boolean]> = [
      [[makeSlide('a')], [], true],
      [[makeSlide('a')], [makeSave('a', false)], false],
      [[makeSlide('a')], [makeSave('a', true)], false],
      [[makeSlide('a')], [makeSave('a', true)], true],
      [[makeSlide('a'), makeSlide('b')], [makeSave('a', true)], true],
      [[makeSlide('a'), makeSlide('b')], [makeSave('b', true)], true],
    ];
    for (const [slides, saves, advance] of cases) {
      const state = getQuizState(slides, saves, advance);
      expect(VALID_STATES).toContain(state);
    }
  });

  it('returns END only when saves.length === slides.length and last save.cont is true', () => {
    const slides = [makeSlide('a'), makeSlide('b')];

    // Not END: saves.length < slides.length
    expect(getQuizState(slides, [makeSave('a', true)], true)).not.toBe('END');

    // Not END: saves.length === slides.length but last.cont === false
    const savesNotCont = [makeSave('a', true), makeSave('b', false)];
    expect(getQuizState(slides, savesNotCont, true)).not.toBe('END');

    // IS END: both conditions met
    const savesAllCont = [makeSave('a', true), makeSave('b', true)];
    expect(getQuizState(slides, savesAllCont, true)).toBe('END');
  });

  it('never returns END when saves.length < slides.length', () => {
    const slides = Array.from({ length: 5 }, (_, i) => makeSlide(`q${i}`));
    for (let n = 0; n < slides.length; n++) {
      const saves = Array.from({ length: n }, (_, i) => makeSave(`q${i}`, true));
      const state = getQuizState(slides, saves, true);
      expect(state).not.toBe('END');
    }
  });

  it('returns DECORATE when last save.cont is false (regardless of advance)', () => {
    const slides = [makeSlide('a'), makeSlide('b')];
    const saves = [makeSave('a', false)];
    expect(getQuizState(slides, saves, true)).toBe('DECORATE');
    expect(getQuizState(slides, saves, false)).toBe('DECORATE');
  });

  it('returns NEXT when advance is true and last save.cont is true but not all done', () => {
    const slides = [makeSlide('a'), makeSlide('b')];
    const saves = [makeSave('a', true)];
    expect(getQuizState(slides, saves, true)).toBe('NEXT');
    expect(getQuizState(slides, saves, false)).toBe('CURRENT');
  });
});

describe('dispatch2 — properties', () => {
  it('always returns the value produced by the matching action', () => {
    const slides2 = [makeSlide('x'), makeSlide('y')];
    const cases: Array<[SlideInterface[], SaveData[], boolean, string]> = [
      [[makeSlide('x')], [], true, 'BEGIN'],
      [[makeSlide('x')], [], false, 'BEGIN'],
      [slides2, [makeSave('x', false)], true, 'DECORATE'],
      [[makeSlide('x')], [makeSave('x', true)], true, 'END'],
      [slides2, [makeSave('x', true)], true, 'NEXT'],
      [slides2, [makeSave('x', true)], false, 'CURRENT'],
    ];

    for (const [slides, saves, advance, expected] of cases) {
      expect(dispatch2(echoActions, slides, saves, advance)).toBe(expected);
    }
  });

  it('dispatch2 is a pure function of its inputs', () => {
    const slides = [makeSlide('p'), makeSlide('q')];
    const saves = [makeSave('p', true)];

    // Calling twice with the same args returns the same result
    const r1 = dispatch2(echoActions, slides, saves, true);
    const r2 = dispatch2(echoActions, slides, saves, true);
    expect(r1).toBe(r2);
  });
});
