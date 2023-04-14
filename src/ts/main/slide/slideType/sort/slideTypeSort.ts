import type { AdocVisitorInterface } from '../../../datalayer/mediator';
import { AdocVisitor } from '../../../datalayer/mediator';
import { Slide } from '../../slide';
import type { SlideInterfaceProperties } from '../../slideInterface';
import type { MarkTypeSort, SlideType } from '../slideType';
export class Sort extends Slide implements SlideType {
  processJson(json: SlideInterfaceProperties): void {
    ({ txt: this.txt, ans: this.ans, isExercise: this.isExercise } = json);
    this.accept(new AdocVisitor());
  }
  accept(visitor: AdocVisitorInterface): void {
    visitor.visitSort(this);
  }
  makeSlides(doc: Document): void {
    const txt = this.txt;
    const ans = this.ans;
    const createHtml = this.createHtml;
    const makeSlidesStrategy = this.makeSlidesStrategy;
    makeSlidesStrategy(txt, ans, createHtml, doc, this);
  }
  decorate(doc: Document) {
    const isCorrect = this.result() as boolean;
    this.mark(isCorrect, doc);
    return isCorrect;
  }
  mark: MarkTypeSort = (isCorrect, doc) => {
    const msg = isCorrect ? 'correct' : 'incorrect';
    const content = doc.getElementById('content') as HTMLElement;
    content.insertAdjacentHTML('beforeend', msg);
  };
}
