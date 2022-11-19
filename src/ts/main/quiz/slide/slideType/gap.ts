import { polyfill } from 'mobile-drag-drop';
import { isRandom, shuffle } from '../../../utilities';
import { Slide } from '../../slide';
//Despite the documentation, "scroll behaviour" is required, not optional,
//for basic mobile drag-and-drop ability.
import { scrollBehaviourDragImageTranslateOverride } from 'mobile-drag-drop/scroll-behaviour';
import type { SlideInterface } from '../../slideInterface';
import type { MakeSlidesTypeGap } from '../strategies/makeSlidesStrategy';
import { SetWidths } from '../strategies/setWidthsStrategy';
polyfill({
  dragImageTranslateOverride: scrollBehaviourDragImageTranslateOverride,
});
export class Gap extends Slide {
  processJson(json: Gap): void {
    ({ txt: this.txt, ans: this.ans, isExercise: this.isExercise } = json);
  }
  makeSlides(doc: Document): void {
    const txt = this.txt as string;
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
  decorate(setValues: SlideInterface, doc: Document) {
    const corrArr = setValues.result() as boolean[];
    this.mark(corrArr, doc);
    const correct = corrArr.filter(Boolean).length;
    const numAnswers = setValues.getAns().length;
    this.summary(correct, numAnswers, doc);
    return correct === setValues.getAns().length;
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
      const color = answer ? 'green' : 'red';
      const id = 'ans' + ctr;
      const eAns = doc.getElementById(id) as HTMLElement;
      eAns.style.backgroundColor = color;
      eAns.style.color = 'white';
    });
  }
}
