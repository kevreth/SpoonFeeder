import { Slide } from '../../slide';
import type { CreateHtmlTypeInfo } from '../strategies/createHtmlStrategy';
import type { MakeSlidesTypeInfo } from '../strategies/makeSlidesStrategy';
export class Info extends Slide {
  decorate(doc: Document): boolean {
    doc.getRootNode();
    return true;
  }
  processJson(json: Info): void {
    ({ txt: this.txt } = json);
  }
  makeSlides(doc: Document): void {
    const txt = this.txt;
    const createHtml = this.createHtml as CreateHtmlTypeInfo;
    const makeSlidesStrategy = this.makeSlidesStrategy as MakeSlidesTypeInfo;
    makeSlidesStrategy(txt, createHtml, doc, this);
  }
}
