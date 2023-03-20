import { removeListener } from '../../../utilities';
import { Slide } from '../../slide';
import type { MakeSlidesTypeMc } from '../strategies/makeSlidesStrategy';
import { SetWidths } from '../strategies/setWidthsStrategy';
import { isRandom, shuffle } from '../../../utilities';
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
    const btn = doc.getElementById('btn' + optionCtr) as HTMLElement;
    let selected = false;
    if(btn.style.backgroundColor === 'blue')
      selected = true;
    if(isCorrect && selected) btn.style.backgroundColor = 'green';
    if(!isCorrect && selected) btn.style.backgroundColor = 'red';
    if(isCorrect && !selected) btn.style.borderColor = 'red';
  }
}
