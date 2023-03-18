import { removeListener } from '../../../utilities';
import { Slide } from '../../slide';
import type { MakeSlidesTypeMc } from '../strategies/makeSlidesStrategy';
import { SetWidths } from '../strategies/setWidthsStrategy';
export class Mc extends Slide {
  o: string[] = [];
  multipleAnswerFlag = false;
  processJson(json: Mc): void {
    ({ txt: this.txt, o: this.o, isExercise: this.isExercise, numans: this.numans} = json);
    if(this.numans === undefined ) {
      this.ans = this.o[0];
    }
    else {
      this.multipleAnswerFlag = true;
      const answers:string[] = [];
      for(let i=0; i<this.numans; i++) {
        answers.push(this.o[i]);
      }
      this.ans = answers;
    }
  }
  makeSlides(doc: Document): void {
    const isExercise = this.isExercise;
    const createHtml = this.createHtml;
    const maxWidthStrategy = SetWidths.SIMPLE;
    const txt = this.txt;
    const options = this.o;
    const multipleAnswerFlag = this.multipleAnswerFlag;
    const makeSlidesStrategy = this.makeSlidesStrategy as MakeSlidesTypeMc;
    makeSlidesStrategy(
      txt,
      options,
      multipleAnswerFlag,
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
    console.log(optionCtr);
    this.mark(isCorrect, optionCtr, doc);
    return isCorrect;
  }
  mark(isCorrect: boolean, optionCtr: number, doc: Document) {
    const optionButton = doc.getElementById('btn' + optionCtr) as HTMLElement;
    const color = isCorrect ? 'green' : 'red';
    optionButton.style.backgroundColor = color;
  }
}
