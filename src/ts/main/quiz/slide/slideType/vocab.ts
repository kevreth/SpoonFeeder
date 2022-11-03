import { isRandom, shuffleMap } from '../../../utilities';
import { Slide } from '../../slide';
import { SlideInterface } from '../../slideInterface';
import type { MakeSlidesTypeVocab } from '../strategies/makeSlidesStrategy';
import { SetWidths } from '../strategies/setWidthsStrategy';
export class Vocab extends Slide {
  list = new Map<string, string>();
  res = new Array<string>();
  set = new Array<SlideInterface>();
  processJson(json: Vocab): void {
    this.list = new Map(Object.entries(json.list));
    this.txt = Array.from(this.list.values());
    this.ans = Array.from(this.list.keys());
    this.isExercise = json.isExercise;
  }
  getSlideSet(): SlideInterface[] {
    return this.set;
  }
  makeSlides(doc: Document): void {
    if (isRandom()) this.list = shuffleMap(this.list);
    const list = this.list;
    const maxWidthStrategy = SetWidths.SIMPLE;
    const res = this.res as string[];
    const createHtml = this.createHtml;
    const setValues = this.getSetValues();
    const set = this.set;
    const makeSlidesStrategy = this.makeSlidesStrategy as MakeSlidesTypeVocab;
    makeSlidesStrategy(
      list,
      res,
      createHtml,
      maxWidthStrategy,
      doc,
      setValues,
      set
    );
  }
  getAnswerCount(): number {
    return this.list.size;
  }
}
