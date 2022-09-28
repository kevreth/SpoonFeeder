import { Slide } from '../../slide';
import { CreateHtml } from '../strategies/createHtml';
import { MakeSlidesSelectType } from '../strategies/makeSlides';
export class Select extends Slide<Array<number>> {
  inst = '';
  createHtml = CreateHtml.SELECT;
  processJson(json: Select): void {
    ({
      inst: this.inst,
      txt: this.txt,
      ans: this.ans,
      isExercise: this.isExercise,
    } = json);
  }
  makeSlides(doc: Document): void {
    const inst = this.inst;
    const res = (this.txt as string).split(' ');
    const ans = this.ans;
    const setValues = this.getSetValues();
    const createHtml = this.createHtml;
    const makeSlidesStrategy = (this.makeSlidesStrategy as MakeSlidesSelectType);
    makeSlidesStrategy(inst, ans, res, createHtml, doc, setValues);
  }
}

