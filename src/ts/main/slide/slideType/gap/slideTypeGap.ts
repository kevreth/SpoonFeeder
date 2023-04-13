import { polyfill } from 'mobile-drag-drop';
import { CORRECT, INCORRECT } from '../../markupColors';
import { shuffle } from '../../../quiz/utilities';
import { isRandom } from '../../../datalayer/mediator';
import { Slide } from '../../slide';
//Despite the documentation, "scroll behaviour" is required, not optional,
//for basic mobile drag-and-drop ability.
import { scrollBehaviourDragImageTranslateOverride } from 'mobile-drag-drop/scroll-behaviour';
import type { AdocVisitorInterface } from '../../../datalayer/mediator';
import { AdocVisitor } from '../../../datalayer/mediator';
import { SetWidths } from '../../strategies/setWidthsStrategy/setWidthsStrategy';
import type { SlideInterface } from '../../slideInterface';
import type { MarkTypeGap, SlideType } from '../slideType';
import { MakeSlidesTypeGap } from './makeSlidesStrategyGap';
polyfill({
  dragImageTranslateOverride: scrollBehaviourDragImageTranslateOverride,
});
export class Gap extends Slide implements SlideType {
  processJson(json: SlideInterface): void {
    const json1 = json as Gap
    ({ txt: this.txt, ans: this.ans, isExercise: this.isExercise } = json1);
    this.accept(new AdocVisitor());
  }
  accept(visitor: AdocVisitorInterface): void {
    visitor.visitGap(this);
  }
  makeSlides(doc: Document): void {
    const txt = this.txt;
    const maxWidthStrategy = SetWidths.TARGETED;
    const createHtml = this.createHtml;
    let ans = this.ans;
    if (isRandom()) ans = shuffle(ans as string[]);
    const makeSlidesStrategy = this.makeSlidesStrategy as MakeSlidesTypeGap;
    makeSlidesStrategy(txt, ans, createHtml, maxWidthStrategy, doc, this);
  }
  getAnswerCount(): number {
    return this.ans.length;
  }
  decorate(doc: Document) {
    const corrArr = this.result() as boolean[];
    this.mark(corrArr, doc);
    const correct = corrArr.filter(Boolean).length;
    const numAnswers = this.getAns().length;
    this.summary(correct, numAnswers, doc);
    return correct === this.getAns().length;
  }
  summary(correct: number, numAns: number, doc: Document) {
    const pctCorrect = ((correct / numAns) * 100).toFixed(0);
    const response =
      `Number correct: ${correct} <br>\nNumber questions: ` +
      `${numAns} <br>\n${pctCorrect}%`;
    const responseElem = doc.getElementById('response') as HTMLElement;
    responseElem.innerHTML = response;
  }
  mark: MarkTypeGap = (corrArr, doc) => {
    corrArr.forEach((answer, ctr) => {
      const color = answer ? CORRECT : INCORRECT;
      const id = 'ans' + ctr;
      const eAns = doc.getElementById(id) as HTMLElement;
      eAns.style.backgroundColor = color;
      eAns.style.color = 'white';
    });
  }
}