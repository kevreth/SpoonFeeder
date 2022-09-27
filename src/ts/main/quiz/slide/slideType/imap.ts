import { Slide } from '../../slide';
import { Result } from '../strategies/result';
import { CreateHtml } from '../strategies/createHtml';
import { Evaluate } from '../strategies/evaluate';
import { MakeSlides, MakeSlidesImapType } from '../strategies/makeSlides';
export class Imap extends Slide<string> {
  constructor() {
    super('imap', MakeSlides.IMAP, Evaluate.SIMPLE, Result.SIMPLE);
  }
  img = '';
  createHtml = CreateHtml.IMAP;
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
    const txt = (this.txt as string);
    const img = this.img;
    const createHtml = this.createHtml;
    const makeSlidesStrategy = (this.makeSlidesStrategy as MakeSlidesImapType);
    makeSlidesStrategy(txt, img, createHtml, doc, setValues);
  }
}

