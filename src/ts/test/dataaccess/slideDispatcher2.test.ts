import { beforeEach, describe, expect, it } from 'vitest';
import { SaveDataDispatcher } from '../../main/dataaccess/saveData/slideDispatcher2';
import { SaveData } from '../../main/dataaccess/saveData/saveData';
import { Json } from '../../main/dataaccess/saveData/saveFile';
import type { SlideInterface } from '../../main/slide/slideInterface';

function makeSlide(txt: string): SlideInterface {
  return { txt, res: '', ans: '', cont: false } as unknown as SlideInterface;
}

function makeSave(txt: string): SaveData {
  return new SaveData(txt, 'res', '20240101000000', false);
}

// Minimal fillMatchingSlide mock: vitest's module mock is too heavy here.
// We rely on fillMatchingSlide being a no-op when slide.res === '' and save.result === 'res'.
// The tests verify structural behaviour (which slide is returned) not result filling.

beforeEach(() => {
  Json.set([makeSlide('q1'), makeSlide('q2'), makeSlide('q3')]);
});

describe('SaveDataDispatcher', () => {
  it('begin() returns the first slide', () => {
    const sdd = new SaveDataDispatcher(Json.get(), []);
    expect(sdd.begin().txt).toBe('q1');
  });

  it('current() returns the slide matching the last save', () => {
    const saves = [makeSave('q1')];
    const sdd = new SaveDataDispatcher(Json.get(), saves);
    expect(sdd.current().txt).toBe('q1');
  });

  it('decorate() returns the slide matching the last save', () => {
    const saves = [makeSave('q2')];
    const sdd = new SaveDataDispatcher(Json.get(), saves);
    expect(sdd.decorate().txt).toBe('q2');
  });

  it('next() returns the slide after the last save', () => {
    const saves = [makeSave('q1')];
    const sdd = new SaveDataDispatcher(Json.get(), saves);
    expect(sdd.next().txt).toBe('q2');
  });

  it('end() returns the slide matching the last save (course complete)', () => {
    const saves = [makeSave('q1'), makeSave('q2'), makeSave('q3')];
    const sdd = new SaveDataDispatcher(Json.get(), saves);
    expect(sdd.end().txt).toBe('q3');
  });
});
