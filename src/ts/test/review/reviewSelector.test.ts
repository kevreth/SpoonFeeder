import { describe, it, expect } from 'vitest';
import { vocabToMcForReview, sampleExercises, serializeSlides, deserializeSlides } from '../../main/review/reviewSelector';
import type { SlideInterface } from '../../main/slide/slideInterface';
import type { SaveData } from '../../main/dataaccess/saveData/saveData';

// Deterministic shuffle that reverses the array
const reverseShuffle = <T>(arr: T[]): T[] => [...arr].reverse();
// Identity shuffle for predictable ordering
const noShuffle = <T>(arr: T[]): T[] => [...arr];

function makeSlide(type: string, txt: string, extras: Record<string, unknown> = {}): SlideInterface {
  return {
    type,
    txt,
    isExercise: true,
    list: {},
    set: [],
    o: ['opt-a', 'opt-b', 'opt-c', 'opt-d'],
    ans: 'opt-a' as unknown,
    res: '' as unknown,
    cont: false,
    exp: '',
    ref: '',
    inst: '',
    img: '',
    numans: 0,
    immediateConclusion: false,
    setRes(this: { res: unknown }, r: unknown) { this.res = r; },
    getRes(this: { res: unknown }) { return this.res; },
    getAns(this: { ans: unknown }) { return this.ans; },
    evaluate(this: { ans: unknown; res: unknown; txt: string }) {
      const correct = this.ans === this.res ? 1 : 0;
      return { correct, responses: 1, txt: this.txt };
    },
    setResults(this: { res: unknown }, r: unknown) { this.res = r; },
    ...extras,
  } as unknown as SlideInterface;
}

function makeVocabSlide(entries: Record<string, string>): SlideInterface {
  return makeSlide('vocab', '', { list: entries });
}

function makeSaveData(txt: string, result: unknown, cont: boolean): SaveData {
  return { txt, result, cont, ts: '' } as unknown as SaveData;
}

describe('vocabToMcForReview', () => {
  it('returns empty array for vocab with < 4 entries', () => {
    const vocab = makeVocabSlide({ a: 'A', b: 'B', c: 'C' });
    expect(vocabToMcForReview(vocab, noShuffle)).toHaveLength(0);
  });

  it('generates ceil(n/5) questions for n entries', () => {
    const vocab4 = makeVocabSlide({ a: 'A', b: 'B', c: 'C', d: 'D' });
    expect(vocabToMcForReview(vocab4, noShuffle)).toHaveLength(1);

    const vocab5 = makeVocabSlide({ a: 'A', b: 'B', c: 'C', d: 'D', e: 'E' });
    expect(vocabToMcForReview(vocab5, noShuffle)).toHaveLength(1);

    const vocab6 = makeVocabSlide({ a: 'A', b: 'B', c: 'C', d: 'D', e: 'E', f: 'F' });
    expect(vocabToMcForReview(vocab6, noShuffle)).toHaveLength(2);

    const vocab10 = makeVocabSlide(
      Object.fromEntries([...'abcdefghij'].map((c) => [c, c.toUpperCase()])),
    );
    expect(vocabToMcForReview(vocab10, noShuffle)).toHaveLength(2);
  });

  it('generates MC slides with term as txt and definition as ans', () => {
    const vocab = makeVocabSlide({ term1: 'def1', term2: 'def2', term3: 'def3', term4: 'def4' });
    const slides = vocabToMcForReview(vocab, noShuffle);
    expect(slides).toHaveLength(1);
    const slide = slides[0];
    expect(slide.type).toBe('mc');
    expect(slide.txt).toBeTruthy();
    // The answer should be the definition of the chosen term
    const entries = { term1: 'def1', term2: 'def2', term3: 'def3', term4: 'def4' };
    const def = entries[slide.txt as keyof typeof entries];
    expect(slide.ans).toBe(def);
  });

  it('includes exactly 4 options per question', () => {
    const vocab = makeVocabSlide({ a: 'A', b: 'B', c: 'C', d: 'D' });
    const slides = vocabToMcForReview(vocab, noShuffle);
    expect(slides[0].o).toHaveLength(4);
  });

  it('correct answer is always among options', () => {
    const vocab = makeVocabSlide({ a: 'A', b: 'B', c: 'C', d: 'D', e: 'E' });
    const slides = vocabToMcForReview(vocab, reverseShuffle);
    slides.forEach((slide) => {
      expect(slide.o).toContain(slide.ans as string);
    });
  });
});

describe('sampleExercises', () => {
  it('returns at most SAMPLE_SIZES[scopeType] slides', () => {
    const pool = Array.from({ length: 10 }, (_, i) => makeSlide('mc', `q${i}`));
    const result = sampleExercises(pool, [], 'lesson', noShuffle);
    expect(result.length).toBeLessThanOrEqual(5); // lesson sample size = 5
  });

  it('returns all slides for course scope (no cap)', () => {
    const pool = Array.from({ length: 20 }, (_, i) => makeSlide('mc', `q${i}`));
    const result = sampleExercises(pool, [], 'course', noShuffle);
    expect(result).toHaveLength(20);
  });

  it('prioritizes wrong answers over unanswered over correct', () => {
    const wrong = makeSlide('mc', 'wrong-q');
    const correct = makeSlide('mc', 'correct-q');
    const unanswered = makeSlide('mc', 'unanswered-q');

    const saves = [
      makeSaveData('wrong-q', 'opt-b', true),   // wrong (ans is opt-a)
      makeSaveData('correct-q', 'opt-a', true),  // correct
    ];

    // Set responses on slides
    wrong.setResults('opt-b');
    correct.setResults('opt-a');

    const result = sampleExercises([wrong, correct, unanswered], saves, 'course', noShuffle);

    // With noShuffle, order is: wrong, unanswered, correct
    // Find positions
    const positions = result.map((s) => s.txt);
    expect(positions.indexOf('wrong-q')).toBeLessThan(positions.indexOf('unanswered-q'));
    expect(positions.indexOf('unanswered-q')).toBeLessThan(positions.indexOf('correct-q'));
  });

  it('filters out imap and info types', () => {
    const pool = [
      makeSlide('mc', 'mc-q'),
      makeSlide('imap', 'imap-q'),
      makeSlide('info', 'info-q'),
    ];
    const result = sampleExercises(pool, [], 'course', noShuffle);
    expect(result.every((s) => s.type !== 'imap' && s.type !== 'info')).toBe(true);
    expect(result).toHaveLength(1);
  });

  it('expands vocab slides using review direction (term → definition)', () => {
    const vocab = makeVocabSlide({ term1: 'def1', term2: 'def2', term3: 'def3', term4: 'def4' });
    const result = sampleExercises([vocab], [], 'course', noShuffle);
    expect(result).toHaveLength(1);
    expect(result[0].type).toBe('mc');
    // ans should be a definition (value), not a key
    const defs = ['def1', 'def2', 'def3', 'def4'];
    expect(defs).toContain(result[0].ans as string);
  });

  it('uses all available when pool < sample size', () => {
    const pool = [makeSlide('mc', 'q1'), makeSlide('mc', 'q2')];
    const result = sampleExercises(pool, [], 'lesson', noShuffle); // lesson sample = 5
    expect(result).toHaveLength(2);
  });
});

describe('serializeSlides / deserializeSlides', () => {
  it('round-trips a regular slide via sourceTxt', () => {
    const slide = makeSlide('mc', 'my question');
    const serialized = serializeSlides([slide]);
    expect(serialized[0].sourceTxt).toBe('my question');
    expect(serialized[0].vocabTerm).toBeUndefined();
  });

  it('deserializes a regular slide by looking up sourceTxt', () => {
    const slide = makeSlide('mc', 'my question');
    const allSlides = [slide];
    const serialized = serializeSlides([slide]);
    const deserialized = deserializeSlides(serialized, allSlides);
    expect(deserialized[0].txt).toBe('my question');
    expect(deserialized[0].type).toBe('mc');
  });

  it('throws when sourceTxt is not found in allSlides', () => {
    const serialized = [{ sourceTxt: 'missing-question' }];
    expect(() => deserializeSlides(serialized, [])).toThrow();
  });
});
