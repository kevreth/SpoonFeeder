import { removeListener, shuffle } from '../../../quiz/mediator';
import type { AnswerType, SlideInterface } from '../../../slide/mediator';
import { RANDOM, Slide } from '../../../slide/mediator';
import type { AdocVisitorInterface } from '../../misc/adocVisitor';
import { AdocVisitor } from '../../misc/adocVisitor';
import { CORRECT, INCORRECT } from '../../misc/markupColors';
import type { MarkTypeMc, SlideType } from '../../misc/slideType';
import { SetWidths } from '../../strategies/setWidthsStrategy/setWidthsStrategy';
export class Mc extends Slide implements SlideType {
  o: string[] = [];
  setProperties(props: SlideInterface): void {
    ({
      txt: this.txt,
      o: this.o,
      exp: this.exp,
      ref: this.ref,
      isExercise: this.isExercise,
    } = props);
    this.accept(new AdocVisitor());
    this.ans = this.o[0] as AnswerType;
    const shuffleFlag = this.isExercise && RANDOM.is();
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
    const color = isCorrect ? CORRECT : (answerButton.style.border = `1px solid ${INCORRECT}`, INCORRECT);
    responseButton.style.backgroundColor = color;
  };
}
