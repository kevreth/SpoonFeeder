import { SetWidths } from '../strategies/setWidths';
import { Slide } from '../../slide';
import { isRandom, shuffleMap } from '../../../utilities';
import { Result } from '../strategies/result';
import { CreateHtml } from '../strategies/createHtml';
import { Evaluate } from '../strategies/evaluate';
import { MakeSlides, MakeSlidesVocabType } from '../strategies/makeSlides';
export const CHOICES = 4;
export type vocabTuplesType = [
  txt: string,
  ans: string,
  options: Array<string>
][];
export class Vocab extends Slide<Array<string>> {
  constructor() {
    super('vocab', MakeSlides.VOCAB, Evaluate.VOCAB,Result.CORRELATED);
  }
  list = new Map<string,string>();
  res = new Array<string>();
  txt = new Array<string>();
  createHtml = CreateHtml.MC;
  processJson(json: Vocab): void {
    this.list = new Map(Object.entries(json.list));
    this.txt = Array.from(this.list.values());
    this.ans = Array.from(this.list.keys());
    this.isExercise = json.isExercise;
  }
  makeSlides(doc: Document): void {
    if (isRandom()) this.list = shuffleMap(this.list);
    const list = this.list;
    const maxWidthStrategy = SetWidths.SIMPLE;
    const res = this.res;
    const setValues = this.getSetValues();
    const createHtml = this.createHtml;
    const makeSlidesStrategy = (this.makeSlidesStrategy as MakeSlidesVocabType);
    makeSlidesStrategy(list, res, createHtml, maxWidthStrategy, doc, setValues);
  }
}
