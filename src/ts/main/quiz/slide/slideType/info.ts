import { Slide } from '../../slide';
import { AdocVisitor, AdocVisitorInterface } from '../adocVisitor';
import type { CreateHtmlTypeInfo } from '../strategies/createHtmlStrategy';
import type { MakeSlidesTypeInfo } from '../strategies/makeSlidesStrategy';
export class Info extends Slide {
  decorate(doc: Document): boolean {
    doc.getRootNode();
    return true;
  }
  accept(visitor: AdocVisitorInterface): void {
    visitor.visitInfo(this);
  }
  processJson(json: Info): void {
    ({ txt: this.txt } = json);
    this.accept(new AdocVisitor())
  }
  makeSlides(doc: Document): void {
    const txt = this.txt;
    const createHtml = this.createHtml as CreateHtmlTypeInfo;
    const makeSlidesStrategy = this.makeSlidesStrategy as MakeSlidesTypeInfo;
    makeSlidesStrategy(txt, createHtml, doc, this);
  }
}
