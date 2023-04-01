import type { AdocVisitorInterface } from '../../datalayer/adocVisitor';
import { AdocVisitor } from '../../datalayer/adocVisitor';
import { Slide } from '../../slide';
import type { CreateHtmlTypeInfo } from '../strategies/createHtmlStrategy';
import type { MakeSlidesTypeInfo } from '../strategies/makeSlidesStrategy';
export class Info extends Slide {
  processJson(json: Info): void {
    ({ txt: this.txt } = json);
    this.accept(new AdocVisitor());
  }
  accept(visitor: AdocVisitorInterface): void {
    visitor.visitInfo(this);
  }
  decorate(doc: Document): boolean {
    doc.getRootNode();
    return true;
  }
  makeSlides(doc: Document): void {
    const txt = this.txt;
    const createHtml = this.createHtml as CreateHtmlTypeInfo;
    const makeSlidesStrategy = this.makeSlidesStrategy as MakeSlidesTypeInfo;
    makeSlidesStrategy(txt, createHtml, doc, this);
  }
}
