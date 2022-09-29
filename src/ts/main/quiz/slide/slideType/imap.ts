import { Slide } from '../../slide';
import type { MakeSlidesImapType } from '../strategies/makeSlides';
export class Imap extends Slide<string> {
  img = '';
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
    const txt = this.txt as string;
    const img = this.img;
    const createHtml = this.createHtml;
    const makeSlidesStrategy = this.makeSlidesStrategy as MakeSlidesImapType;
    makeSlidesStrategy(txt, img, createHtml, doc, setValues);
  }
}
