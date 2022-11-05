import { isRandom, shuffle } from '../../../utilities';
import { Slide } from '../../slide';
import { MC } from '../../slideFactory';
import type { SlideInterface } from '../../slideInterface';
export const CHOICES = 4;
export type vocabTuplesType = [
  txt: string,
  ans: string,
  options: Array<string>
][];
//Vocab is different than the other slide types because it concisely
//represents a group of mc questions.
export class Vocab extends Slide {
  list = new Map<string, string>();
  res = new Array<string>();
  set = new Array<SlideInterface>();
  processJson(json: Vocab): void {
    this.list = new Map(Object.entries(json.list));
    this.txt = Array.from(this.list.values());
    this.ans = Array.from(this.list.keys());
    this.isExercise = json.isExercise;
    const vocabTuples = generateQuestions(this.list);
    vocabTuples.forEach((vtuple) => {
      const slide = MC();
      slide.txt = vtuple[0];
      slide.ans = vtuple[1];
      slide.o = vtuple[2];
      slide.isExercise = this.isExercise;
      this.set.push(slide);
    });
  }
  getSlideSet(): SlideInterface[] {
    return this.set;
  }
  makeSlides(): void {
    return;
  }
  getAnswerCount(): number {
    return this.list.size;
  }
}
export function generateQuestions(map: Map<string, string>) {
  const keys = Array.from(map.keys());
  const vocabTuples: vocabTuplesType = [];
  for (const key of keys) {
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
