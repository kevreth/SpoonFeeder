import { removeListener } from '../../../utilities';
import { isRandom, shuffle } from '../../../utilities';
import { Slide } from '../../slide';
import type { MakeSlidesTypeMc } from '../strategies/makeSlidesStrategy';
import { SetWidths } from '../strategies/setWidthsStrategy';
import { CORRECT, INCORRECT} from '../../../markupColors';
import { AdocVisitor}from '../../datalayer/adocVisitor';
import type {AdocVisitorInterface } from '../../datalayer/adocVisitor';
export class Mc extends Slide {
  o: string[] = [];
  processJson(json: Mc): void {
    ({
      txt: this.txt,
      o: this.o,
      exp: this.exp,
      ref: this.ref,
      isExercise: this.isExercise
     } = json);
    this.accept(new AdocVisitor())
    this.ans = this.o[0];
    const shuffleFlag = this.isExercise && isRandom();
    if (shuffleFlag) this.o = shuffle(this.o);
  }
  accept(visitor: AdocVisitorInterface): void {
    visitor.visitMc(this);
  }
  makeSlides(doc: Document): void {
    const isExercise = this.isExercise;
    const createHtml = this.createHtml;
    const maxWidthStrategy = SetWidths.SIMPLE;
    const txt = this.txt;
    const options = this.o;
    const makeSlidesStrategy = this.makeSlidesStrategy as MakeSlidesTypeMc;
    makeSlidesStrategy(
      txt,
      options,
      isExercise,
      createHtml,
      maxWidthStrategy,
      doc,
      this
    );
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
    const responseButton = doc.getElementById('btn' + responseOption) as HTMLElement;
    const answerButton = doc.getElementById('btn' + answerOption) as HTMLElement;
    this.mark(isCorrect, responseButton, answerButton);
    return isCorrect;
  }
  mark(isCorrect: boolean, responseButton: HTMLElement, answerButton:HTMLElement) {
    let color = INCORRECT;
    isCorrect ? color = CORRECT : answerButton.style.border = `1px solid ${INCORRECT}`;
    responseButton.style.backgroundColor = color;
  }
}
