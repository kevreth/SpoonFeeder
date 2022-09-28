import { SetWidths } from '../strategies/setWidths';
import { Slide } from '../../slide';
import { isRandom, shuffleMap } from '../../../utilities';
import { MakeSlidesVocabType } from '../strategies/makeSlides';
export class Vocab extends Slide<Array<string>> {
  list = new Map<string,string>();
  res = new Array<string>();
  txt = new Array<string>();
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
