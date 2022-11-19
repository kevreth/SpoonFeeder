import { Slide } from '../../slide';
import type { MakeSlidesTypeSort } from '../strategies/makeSlidesStrategy';
export class Sort extends Slide {
  processJson(json: Sort): void {
    ({ txt: this.txt, ans: this.ans, isExercise: this.isExercise } = json);
  }
  makeSlides(doc: Document): void {
    const txt = this.txt as string;
    const ans = this.ans;
    const createHtml = this.createHtml;
    const makeSlidesStrategy = this.makeSlidesStrategy as MakeSlidesTypeSort;
    makeSlidesStrategy(txt, ans, createHtml, doc, this);
  }
  decorate(doc: Document) {
    const isCorrect = this.result() as boolean;
    this.mark(isCorrect, doc);
    return isCorrect;
  }
  mark(isCorrect: boolean, doc: Document) {
    const msg = isCorrect ? 'correct' : 'incorrect';
    const content = doc.getElementById('content') as HTMLElement;
    content.insertAdjacentHTML('beforeend', msg);
  }
}
