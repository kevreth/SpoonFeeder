import { CORRECT, INCORRECT } from '../../markupColors';
import { difference, intersection } from '../../../quiz/utilities';
import type { AdocVisitorInterface } from '../../../datalayer/mediator';
import { AdocVisitor } from '../../../datalayer/mediator';
import { Slide } from '../../slide';
import type { SlideInterface } from '../../slideInterface';
import type { AnswerType } from '../../strategies/resultStrategy';
import type { MarkTypeSelect, SlideType } from '../slideType';
import { MakeSlidesTypeSelect } from './makeSlidesStrategySelect';
export class Select extends Slide implements SlideType  {
  inst = '';
  processJson(json: SlideInterface): void {
    const json1 = json as Select
    ({
      inst: this.inst,
      txt: this.txt,
      ans: this.ans,
      isExercise: this.isExercise,
    } = json1);
    this.accept(new AdocVisitor());
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