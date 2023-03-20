import { removeListener } from '../../../utilities';
import { isRandom, shuffle } from '../../../utilities';
import { Slide } from '../../slide';
import type { MakeSlidesTypeMc } from '../strategies/makeSlidesStrategy';
import { SetWidths } from '../strategies/setWidthsStrategy';
export class Mc extends Slide {
  o: string[] = [];
  processJson(json: Mc): void {
    ({ txt: this.txt, o: this.o, isExercise: this.isExercise } = json);
    this.ans = this.o[0];
    const shuffleFlag = this.isExercise && isRandom();
    if (shuffleFlag) this.o = shuffle(this.o);
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
    for (let i = 0; i < options.length; i++)
      removeListener(doc.getElementById('btn' + i) as HTMLElement);
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
    let color = 'red';
    isCorrect ? color = 'green' : answerButton.style.borderColor = 'red';
    responseButton.style.backgroundColor = color;
  }
}
