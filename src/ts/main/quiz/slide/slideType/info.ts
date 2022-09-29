import { Slide } from '../../slide';
import type { CreateHtmlTypeInfo } from '../strategies/createHtml';
import type { MakeSlidesInfoType } from '../strategies/makeSlides';
export class Info extends Slide<string> {
  processJson(json: Info): void {
    ({ txt: this.txt } = json);
  }
  makeSlides(doc: Document): void {
    const txt = this.txt as string;
    const setValues = this.getSetValues();
    const createHtml = this.createHtml as CreateHtmlTypeInfo;
    const makeSlidesStrategy = this.makeSlidesStrategy as MakeSlidesInfoType;
    makeSlidesStrategy(txt, createHtml, doc, setValues);
  }
}
