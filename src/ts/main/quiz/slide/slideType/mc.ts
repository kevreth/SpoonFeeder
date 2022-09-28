import { SetWidths } from '../strategies/setWidths';
import { Slide } from '../../slide';
import { CreateHtml } from '../strategies/createHtml';
import { MakeSlidesMcType } from '../strategies/makeSlides';
export class Mc extends Slide<string> {
  o: string[] = [];
  createHtml = CreateHtml.MC;
  processJson(json: Mc): void {
    ({
      txt: this.txt,
      o: this.o,
      ans: this.ans,
      isExercise: this.isExercise,
    } = json);
    this.ans = this.o[0];
  }
  makeSlides(doc: Document): void {
    const setValues = this.getSetValues();
    const isExercise = this.isExercise;
    const createHtml = this.createHtml;
    const maxWidthStrategy = SetWidths.SIMPLE;
    const txt = (this.txt as string);
    const options = this.o;
    const makeSlidesStrategy = (this.makeSlidesStrategy as MakeSlidesMcType);
    makeSlidesStrategy (txt, options, isExercise, createHtml, maxWidthStrategy, doc, setValues);
  }
}

