import { Slide } from '../../slide';
import { Result } from '../strategies/result';
import { CreateHtml } from '../strategies/createHtml';
import { Evaluate } from '../strategies/evaluate';
import { MakeSlides } from '../strategies/makeSlides';
export class Imap extends Slide<string> {
  constructor() {
    super('imap',Evaluate.SIMPLE);
  }
  img = '';
  resultType = Result.SIMPLE;
  createHtml = CreateHtml.IMAP;
  evaluateStrategy = Evaluate.SIMPLE;
  makeSlidesStrategy = MakeSlides.IMAP;
  processJson(json: Imap): void {
    ({
      txt: this.txt,
      img: this.img,
      ans: this.ans,
      isExercise: this.isExercise,
    } = json);
  }
  makeSlides(doc: Document): void {
    const setValues = this.getSetValues();
    const txt = this.txt;
    const img = this.img;
    const createHtml = this.createHtml;
    this.makeSlidesStrategy((txt as string), img, createHtml, doc, setValues);
  }
}

