import { Slide } from '../../slide';
import { SlideInterface } from '../../slideInterface';
import type { CreateHtmlTypeInfo } from '../strategies/createHtmlStrategy';
import type { MakeSlidesTypeInfo } from '../strategies/makeSlidesStrategy';
export class Info extends Slide {
  decorate(setValues: SlideInterface, doc: Document): boolean {
    setValues.getAns();
    doc.getRootNode();
    throw new Error('Method not implemented.');
  }
  processJson(json: Info): void {
    ({ txt: this.txt } = json);
  }
  makeSlides(doc: Document): void {
    const txt = this.txt as string;
    const createHtml = this.createHtml as CreateHtmlTypeInfo;
    const makeSlidesStrategy = this.makeSlidesStrategy as MakeSlidesTypeInfo;
    makeSlidesStrategy(txt, createHtml, doc, this);
  }
}
