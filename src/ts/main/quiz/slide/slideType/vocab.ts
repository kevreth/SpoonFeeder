import { isRandom, shuffleMap } from '../../../utilities';
import { Slide } from '../../slide';
import type { SaveData } from '../saveData';
import type { MakeSlidesTypeVocab } from '../strategies/makeSlidesStrategy';
import { SetWidths } from '../strategies/setWidthsStrategy';
export class Vocab extends Slide<Array<string>> {
  list = new Map<string, string>();
  res = new Array<string>();
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
    const createHtml = this.createHtml;
    const makeSlidesStrategy = this.makeSlidesStrategy as MakeSlidesTypeVocab;
    makeSlidesStrategy(list, res, createHtml, maxWidthStrategy, doc);
  }
  getAnswerCount(): number {
    return this.list.size;
  }
  getSlideSavedIndex(arr: Array<SaveData>): number {
    arr[0]; //just to prevent lint warning
    //Vocab needs to check what needs to be displayed,
    //so return -1 so it's always executed.
    return -1;
  }
}
