import { isEqual, isRandom, shuffle } from '../../../utilities';
import { Slide } from '../../slide';
import { MC } from '../../slideFactory';
import type { SlideInterface } from '../../slideInterface';
import { SaveData } from '../saveData';
import type { AnswerType } from '../strategies/resultStrategy';
const { get: getSavedDataArray } = SaveData;
export const CHOICES = 4;
export type vocabTuplesType = [
  txt: string,
  ans: string,
  options: Array<string>
][];
export class Vocab extends Slide {
  list = new Map<string, string>();
  res = new Array<string>();
  set = new Array<SlideInterface>();
  processJson(json: Vocab): void {
    this.list = new Map(Object.entries(json.list));
    this.txt = Array.from(this.list.values());
    this.ans = Array.from(this.list.keys());
    this.isExercise = json.isExercise;

    const txtArr = Array.from(this.list.values());
    const savedData = getSavedDataArray();
    const missing = getMissingSlides(savedData, txtArr);
    const vocabTuples = generateQuestions(this.list, missing);
    vocabTuples.forEach((vtuple) => {
      const slide = MC();
      slide.txt = vtuple[0];
      slide.ans = vtuple[1];
      slide.o = vtuple[2];
      slide.isExercise = true;
      this.set.push(slide);
    });
  }
  getSlideSet(): SlideInterface[] {
    return this.set;
  }
  makeSlides(doc: Document): void {
    return;
  }
  //   if (isRandom()) this.list = shuffleMap(this.list);
  //   const list = this.list;
  //   const maxWidthStrategy = SetWidths.SIMPLE;
  //   const res = this.res as string[];
  //   const createHtml = this.createHtml;
  //   const setValues = this.getSetValues();
  //   const set = this.set;
  //   const makeSlidesStrategy = this.makeSlidesStrategy as MakeSlidesTypeVocab;
  //   makeSlidesStrategy(
  //     list,
  //     res,
  //     createHtml,
  //     maxWidthStrategy,
  //     doc,
  //     setValues,
  //     set
  //   );
  // }
  getAnswerCount(): number {
    return this.list.size;
  }
}
export function getMissingSlides(
  arr: Array<SaveData>,
  txtArr: string[]
): string[] {
  const retval: string[] = [];
  for (const txt of txtArr) {
    const idx = arr.findIndex((x) => isEqual(x.txt, txt as AnswerType));
    if (idx < 0) retval.push(txt as string);
  }
  return retval;
}
export function generateQuestions(
  map: Map<string, string>,
  missingValues: Array<string>
): vocabTuplesType {
  const missingKeys = new Array<string>();
  map.forEach((value, key) => {
    if (missingValues.includes(value)) missingKeys.push(key);
  });
  const keys = Array.from(map.keys());
  const vocabTuples: vocabTuplesType = [];
  for (const key of missingKeys) {
    let options = keys.slice(0, CHOICES);
    //if correct answer is not in "options",
    //replace the first entry with it.
    if (!options.includes(key)) options[0] = key;
    if (isRandom()) options = shuffle(options);
    const quest = map.get(key) as string;
    vocabTuples.push([quest, key, options]);
  }
  return vocabTuples;
}
