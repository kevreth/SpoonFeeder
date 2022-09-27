import { SetWidths } from '../strategies/setWidths';
;
import { Slide } from '../../slide';
import { Result } from '../strategies/result';
import { CreateHtml } from '../strategies/createHtml';
import { Evaluate } from '../strategies/evaluate';
import { MakeSlides } from '../strategies/makeSlides';
export class Mc extends Slide<string> {
  constructor() {
    super('mc',Evaluate.SIMPLE);
  }
  o: string[] = [];
  resultType = Result.SIMPLE;
  maxWidthStrategy = SetWidths.SIMPLE;
  createHtml = CreateHtml.MC;
  makeSlidesStrategy = MakeSlides.MC;
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
    const maxWidthStrategy = this.maxWidthStrategy;
    const txt = this.txt;
    const options = this.o;
    this.makeSlidesStrategy((txt as string), options, isExercise, createHtml, maxWidthStrategy, doc, setValues);
  }
}

