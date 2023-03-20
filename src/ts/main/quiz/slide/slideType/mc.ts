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
    const optionCtr = options.indexOf(this.getRes() as string);
    this.mark(isCorrect, optionCtr, doc);
    return isCorrect;
  }
  mark(isCorrect: boolean, optionCtr: number, doc: Document) {
    const optionButton = doc.getElementById('btn' + optionCtr) as HTMLElement;
    const color = isCorrect ? 'green' : 'red';
    optionButton.style.backgroundColor = color;
  }
}
