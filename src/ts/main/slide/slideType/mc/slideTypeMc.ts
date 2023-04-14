import type { AdocVisitorInterface } from '../../../datalayer/mediator';
import { AdocVisitor, isRandom } from '../../../datalayer/mediator';
import { removeListener, shuffle } from '../../../quiz/utilities';
import { CORRECT, INCORRECT } from '../../markupColors';
import { Slide } from '../../slide';
import type { SlideInterfaceProperties } from '../../slideInterface';
import type { AnswerType } from '../../strategies/resultStrategy';
import { SetWidths } from '../../strategies/setWidthsStrategy/setWidthsStrategy';
import type { MarkTypeMc, SlideType } from '../slideType';
export class Mc extends Slide implements SlideType {
  o: string[] = [];
  processJson(json: SlideInterfaceProperties): void {
    ({
      txt: this.txt,
      o: this.o as string[] | undefined,
      exp: this.exp,
      ref: this.ref,
      isExercise: this.isExercise,
    } = json);
    this.accept(new AdocVisitor());
    this.ans = this.o[0] as AnswerType;
    const shuffleFlag = this.isExercise && isRandom();
    if (shuffleFlag) this.o = shuffle(this.o);
  }
  accept(visitor: AdocVisitorInterface): void {
    visitor.visitMc(this);
  }
  makeSlides(doc: Document): void {
    const createHtml = this.createHtml;
    const maxWidthStrategy = SetWidths.SIMPLE;
    const txt = this.txt;
    const options = this.o;
    const makeSlidesStrategy = this.makeSlidesStrategy;
    makeSlidesStrategy(txt, options, createHtml, maxWidthStrategy, doc, this);
  }
  decorate(doc: Document) {
    const options = this.o;
    for (let i = 0; i < options.length; i++) {
      const btn = doc.getElementById('btn' + i) as HTMLElement;
      removeListener(btn);
      btn.style.border = 'none';
    }
    const isCorrect = this.result() as boolean;
    const response = this.getRes() as string;
    const answer = this.ans as string;
    const responseOption = options.indexOf(response);
    const answerOption = options.indexOf(answer);
    const responseButton = doc.getElementById(
      'btn' + responseOption
    ) as HTMLElement;
    const answerButton = doc.getElementById(
      'btn' + answerOption
    ) as HTMLElement;
    this.mark(isCorrect, responseButton, answerButton);
    return isCorrect;
  }
  mark: MarkTypeMc = (isCorrect, responseButton, answerButton) => {
    let color = INCORRECT;
    isCorrect
      ? (color = CORRECT)
      : (answerButton.style.border = `1px solid ${INCORRECT}`);
    responseButton.style.backgroundColor = color;
  };
}
