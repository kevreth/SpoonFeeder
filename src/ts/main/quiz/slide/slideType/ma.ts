import { removeListener } from '../../../utilities';
import { Slide } from '../../slide';
import type { MakeSlidesTypeMc } from '../strategies/makeSlidesStrategy';
import { SetWidths } from '../strategies/setWidthsStrategy';
export class Ma extends Slide {
  o: string[] = [];
  numans = 0;
  answers:string[] = [];
  processJson(json: Ma): void {
    ({ txt: this.txt, o: this.o, isExercise: this.isExercise, numans: this.numans} = json);
    for(let i=0; i<this.numans; i++) {
      this.answers.push(this.o[i]);
    }
    this.ans = this.answers.sort();
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
      removeListener(doc.getElementById('btn' + i) as HTMLElement);
      const option = options[i];
      let isCorrect = false;
      if (this.answers.includes(option))
        isCorrect = true;
      this.mark(isCorrect, i, doc);
    }
    return this.result() as boolean;
  }
  mark(isCorrect: boolean, optionCtr: number, doc: Document) {
    const optionButton = doc.getElementById('btn' + optionCtr) as HTMLElement;
    const color = isCorrect ? 'green' : 'red';
    optionButton.style.backgroundColor = color;
  }
}
