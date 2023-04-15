import { isRandom } from '../../../datalayer/mediator';
import { shuffle } from '../../../quiz/mediator';
import type { SlideInterface } from '../../../slide/mediator';
import { Slide } from '../../../slide/mediator';
import type { AdocVisitorInterface } from '../../misc/adocVisitor';
import { AdocVisitor } from '../../misc/adocVisitor';
import type { MarkType, SlideType } from '../../misc/slideType';
import type { AnswerType } from '../../strategies/resultStrategy';
import { McFactory } from '../mc/factoryMc';
export const CHOICES = 4;
export type vocabTuplesType = [
  txt: string,
  ans: string,
  options: Array<string>
][];
//Vocab is different than the other slide types because it concisely
//represents a group of mc questions.
export class Vocab extends Slide implements SlideType {
  mark!: MarkType;
  list = new Map<string, string>();
  set = new Array<SlideInterface>();
  setProperties(props: SlideInterface): void {
    this.list = new Map(Object.entries(props.list as Map<string, string>));
    this.isExercise = props.isExercise;
    this.accept(new AdocVisitor());
    const vocabTuples = generateQuestions(this.list);
    vocabTuples.forEach((vtuple) => {
      const slide = new McFactory().instance();
      slide.txt = vtuple[0];
      slide.ans = vtuple[1] as AnswerType;
      slide.o = vtuple[2];
      slide.isExercise = this.isExercise;
      this.set.push(slide);
    });
  }
  accept(visitor: AdocVisitorInterface): void {
    visitor.visitVocab(this);
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
  decorate(doc: Document): boolean {
    this.getAns();
    doc.getRootNode();
    throw new Error('Method not implemented.');
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
