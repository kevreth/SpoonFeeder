import { shuffle } from 'lodash';
import type { SlideInterface } from '../slide/slideInterface';
import type { SaveData } from '../dataaccess/saveData/saveData';
import { getInstance } from '../slidetype/misc/slideFactory';
import type { AnswerType } from '../slide/slideInterface';
import type { SerializedSlide, SlideResult } from './reviewTypes';
import { SAMPLE_SIZES, REVIEWABLE_TYPES } from './reviewTypes';
import type { ReviewBoundary } from './reviewTypes';

type ShuffleFn = <T>(arr: T[]) => T[];

export function vocabToMcForReview(
  vocab: SlideInterface,
  shuffleFn: ShuffleFn = shuffle,
): SlideInterface[] {
  const rawList = vocab.list as unknown;
  const listMap =
    rawList instanceof Map
      ? rawList
      : new Map(Object.entries(rawList as Record<string, string>));

  const entries = Array.from(listMap.entries()) as [string, string][];
  if (entries.length < 4) return [];

  const questionsToGenerate = Math.ceil(entries.length / 5);

  const shuffledEntries = shuffleFn([...entries]);
  const selected = shuffledEntries.slice(0, questionsToGenerate);
  const remainingEntries = shuffledEntries.slice(questionsToGenerate);

  return selected.map(([term, correctDef]) => {
    const distractorPool = [
      ...remainingEntries.map(([, def]) => def),
      ...selected.filter(([t]) => t !== term).map(([, def]) => def),
    ];
    const distractors = shuffleFn(distractorPool).slice(0, 3);
    const options = shuffleFn([correctDef, ...distractors]);

    const slide = getInstance('mc');
    slide.txt = term;
    slide.ans = correctDef as AnswerType;
    slide.o = options;
    slide.isExercise = true;
    slide.exp = '';
    // Mark as vocab-synthesized so serializeSlides can distinguish it from course slides
    (slide as unknown as Record<string, unknown>)['_vocabReview'] = true;
    return slide;
  });
}

function classifyExercise(
  slide: SlideInterface,
  saves: SaveData[],
): 'wrong' | 'correct' | 'unanswered' {
  const idx = saves.findIndex((s) => s.txt === slide.txt);
  if (idx < 0) return 'unanswered';

  slide.setResults(saves[idx].result as AnswerType);
  const evaluation = slide.evaluate();
  const isCorrect = evaluation.correct === evaluation.responses && evaluation.responses > 0;
  return isCorrect ? 'correct' : 'wrong';
}

function expandPool(
  raw: SlideInterface[],
  shuffleFn: ShuffleFn,
): SlideInterface[] {
  const result: SlideInterface[] = [];
  for (const slide of raw) {
    if (slide.type === 'vocab') {
      result.push(...vocabToMcForReview(slide, shuffleFn));
    } else if (REVIEWABLE_TYPES.has(slide.type) && slide.type !== 'vocab') {
      const instance = getInstance(slide.type);
      instance.setProperties(slide);
      result.push(instance);
    }
  }
  return result;
}

export function sampleExercises(
  rawPool: SlideInterface[],
  saves: SaveData[],
  scopeType: ReviewBoundary['scopeType'],
  shuffleFn: ShuffleFn = shuffle,
): SlideInterface[] {
  const sampleSize = SAMPLE_SIZES[scopeType];
  const expanded = expandPool(rawPool, shuffleFn);

  const wrong: SlideInterface[] = [];
  const correct: SlideInterface[] = [];
  const unanswered: SlideInterface[] = [];

  for (const slide of expanded) {
    const bucket = classifyExercise(slide, saves);
    if (bucket === 'wrong') wrong.push(slide);
    else if (bucket === 'correct') correct.push(slide);
    else unanswered.push(slide);
  }

  const shuffledWrong = shuffleFn(wrong);
  const shuffledUnanswered = shuffleFn(unanswered);
  const shuffledCorrect = shuffleFn(correct);

  const ordered = [...shuffledWrong, ...shuffledUnanswered, ...shuffledCorrect];
  const sampled =
    sampleSize === Infinity ? ordered : ordered.slice(0, sampleSize);

  return shuffleFn(sampled);
}

export function serializeSlides(slides: SlideInterface[]): SerializedSlide[] {
  return slides.map((slide) => {
    const isVocabSynthesized =
      (slide as unknown as Record<string, unknown>)['_vocabReview'] === true;
    if (isVocabSynthesized) {
      return {
        vocabTerm: slide.txt,
        vocabAns: slide.ans as string,
        vocabOptions: slide.o,
      };
    }
    return { sourceTxt: slide.txt };
  });
}

export function deserializeSlides(
  serialized: SerializedSlide[],
  allSlides: SlideInterface[],
): SlideInterface[] {
  return serialized.map((s) => {
    if (s.sourceTxt !== undefined) {
      const found = allSlides.find((sl) => sl.txt === s.sourceTxt);
      if (!found) throw new Error(`Review resume: slide not found: "${s.sourceTxt}"`);
      const instance = getInstance(found.type);
      instance.setProperties(found);
      return instance;
    }
    // Synthesized vocab-to-MC slide
    const slide = getInstance('mc');
    slide.txt = s.vocabTerm ?? '';
    slide.ans = (s.vocabAns ?? '') as AnswerType;
    slide.o = s.vocabOptions ?? [];
    slide.isExercise = true;
    return slide;
  });
}

export function computeSlideResults(results: SlideResult[]): {
  correct: number;
  total: number;
  pct: number;
} {
  const correct = results.reduce((sum, r) => sum + r.correct, 0);
  const total = results.reduce((sum, r) => sum + r.total, 0);
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
  return { correct, total, pct };
}
