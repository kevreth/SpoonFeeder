import type { SlideInterface } from '../../../slide/index';
import { Slide } from '../../../slide/index';
import type { AdocVisitorInterface } from '../../misc/adocVisitor';
import { AdocVisitor } from '../../misc/adocVisitor';
import type { MarkTypeSort, SlideType } from '../../misc/slideType';
import { CORRECT, INCORRECT } from '../../misc/markupColors';
export class Sort extends Slide implements SlideType {
  setProperties(props: SlideInterface): void {
    ({ txt: this.txt, ans: this.ans, isExercise: this.isExercise } = props);
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
    const msg = isCorrect
      ? `<span style="color: ${CORRECT}; font-weight: 500;">correct</span>`
      : `<span style="color: ${INCORRECT}; font-weight: 500;">incorrect</span>`;
    const content = doc.getElementById('content') as HTMLElement;
    content.insertAdjacentHTML('beforeend', msg);
  };
}
