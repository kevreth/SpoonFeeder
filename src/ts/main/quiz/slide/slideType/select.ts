import { difference, intersection } from '../../../utilities';
import { Slide } from '../../slide';
import type { MakeSlidesTypeSelect } from '../strategies/makeSlidesStrategy';
import type { AnswerType } from '../strategies/resultStrategy';
import { CORRECT, INCORRECT} from '../../../markupColors';
import { AdocVisitor}from '../../datalayer/adocVisitor';
import type {AdocVisitorInterface } from '../../datalayer/adocVisitor';
export class Select extends Slide {
  inst = '';
  processJson(json: Select): void {
    ({
      inst: this.inst,
      txt: this.txt,
      ans: this.ans,
      isExercise: this.isExercise,
    } = json);
    this.accept(new AdocVisitor())
  }
  accept(visitor: AdocVisitorInterface): void {
    visitor.visitSelect(this);
  }
  makeSlides(doc: Document): void {
    const inst = this.inst;
    const txt = this.txt;
    const createHtml = this.createHtml;
    const makeSlidesStrategy = this.makeSlidesStrategy as MakeSlidesTypeSelect;
    makeSlidesStrategy(inst, txt, createHtml, doc, this);
  }
  decorate(doc: Document) {
    const isCorrect = this.result() as boolean;
    this.mark(this.getAns(), this.getRes(), doc);
    return isCorrect;
  }
  mark(ans: AnswerType, res: AnswerType, doc: Document) {
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
  }
  style(
    diff: AnswerType,
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
