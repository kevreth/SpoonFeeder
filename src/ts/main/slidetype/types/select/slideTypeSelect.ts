import { difference, intersection } from '../../../quiz/mediator';
import type { SlideInterface } from '../../../slide/mediator';
import { Slide } from '../../../slide/mediator';
import type { AdocVisitorInterface } from '../../misc/adocVisitor';
import { AdocVisitor } from '../../misc/adocVisitor';
import { CORRECT, INCORRECT } from '../../misc/markupColors';
import type { MarkTypeSelect, SlideType } from '../../misc/slideType';
export class Select extends Slide implements SlideType {
  inst = '';
  setProperties(props: SlideInterface): void {
    ({
      inst: this.inst,
      txt: this.txt,
      ans: this.ans,
      isExercise: this.isExercise,
    } = props);
    this.accept(new AdocVisitor());
  }
  accept(visitor: AdocVisitorInterface): void {
    visitor.visitSelect(this);
  }
  makeSlides(doc: Document): void {
    const inst = this.inst;
    const txt = this.txt;
    const createHtml = this.createHtml;
    const makeSlidesStrategy = this.makeSlidesStrategy;
    makeSlidesStrategy(inst, txt, createHtml, doc, this);
  }
  decorate(doc: Document) {
    const isCorrect = this.result() as boolean;
    this.mark(this.getAns(), this.getRes(), doc);
    return isCorrect;
  }
  mark: MarkTypeSelect = (ans, res, doc) => {
    const _ans = ans as string[];
    const _res = res as string[];
    // items that were not selected but should have been
    let diff = difference(_ans, _res);
    this.style(diff, 'underline', INCORRECT, doc);
    // items that should not have been selected but were
    diff = difference(_res, _ans);
    this.style(diff, 'line-through', INCORRECT, doc);
    // correctly selected items
    diff = intersection(_res, _ans);
    this.style(diff, 'underline', CORRECT, doc);
  };
  style(
    diff: string[],
    decoration: string,
    color: string,
    doc: Document
  ): void {
    length = diff.length;
    for (let i = 0; i < length; i++) {
      const id = diff[i];
      const element = doc.getElementById('w' + id.toString()) as HTMLElement;
      element.style.textDecoration = decoration;
      element.style.textDecorationColor = color;
      element.style.removeProperty('background-color');
      element.style.color = 'white';
    }
  }
}
