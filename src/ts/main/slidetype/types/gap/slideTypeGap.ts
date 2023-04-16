import { shuffle } from '../../../quiz/mediator';
import type { AnswerType, SlideInterface } from '../../external';
import { Slide, isRandom } from '../../external';
import {
  AdocVisitor,
  AdocVisitorInterface,
  CORRECT,
  INCORRECT,
  MarkTypeGap,
  SetWidths,
  SlideType,
  polyfill,
  scrollBehaviourDragImageTranslateOverride,
} from '../../internal';

polyfill({
  dragImageTranslateOverride: scrollBehaviourDragImageTranslateOverride,
});
export class Gap extends Slide implements SlideType {
  setProperties(props: SlideInterface): void {
    ({ txt: this.txt, ans: this.ans, isExercise: this.isExercise } = props);
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
    if (isRandom()) ans = shuffle(ans as string[]) as AnswerType;
    const makeSlidesStrategy = this.makeSlidesStrategy;
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
  };
}
