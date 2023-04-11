import { polyfill } from 'mobile-drag-drop';
import { CORRECT, INCORRECT } from '../../../markupColors';
import { isRandom, shuffle } from '../../../utilities';
import { Slide } from '../../slide';
//Despite the documentation, "scroll behaviour" is required, not optional,
//for basic mobile drag-and-drop ability.
import { scrollBehaviourDragImageTranslateOverride } from 'mobile-drag-drop/scroll-behaviour';
import type { AdocVisitorInterface } from '../../datalayer/adocVisitor';
import { AdocVisitor } from '../../datalayer/adocVisitor';
import type { MakeSlidesTypeGap } from '../strategies/makeSlidesStrategy/makeSlidesStrategy';
import { SetWidths } from '../strategies/setWidthsStrategy';
polyfill({
  dragImageTranslateOverride: scrollBehaviourDragImageTranslateOverride,
});
export class Gap extends Slide {
  processJson(json: Gap): void {
    ({ txt: this.txt, ans: this.ans, isExercise: this.isExercise } = json);
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
  mark(corrArr: boolean[], doc: Document) {
    corrArr.forEach((answer, ctr) => {
      const color = answer ? CORRECT : INCORRECT;
      const id = 'ans' + ctr;
      const eAns = doc.getElementById(id) as HTMLElement;
      eAns.style.backgroundColor = color;
      eAns.style.color = 'white';
    });
  }
}
