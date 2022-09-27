import { Slide, createPageContent } from '../../slide';
import { Result } from '../strategies/result';
import { CreateHtml } from '../strategies/createHtml';
import { Evaluate } from '../strategies/evaluate';
import { MakeSlides } from '../strategies/makeSlides';
export class Select extends Slide<Array<number>> {
  constructor() {
    super('select',Evaluate.SIMPLE);
  }
  inst = '';
  resultType = Result.LIST;
  createHtml = CreateHtml.SELECT;
  makeSlidesStrategy = MakeSlides.SELECT;
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
    this.makeSlidesStrategy(inst, ans, res, createHtml, doc, setValues);
  }
}

