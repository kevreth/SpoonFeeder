import type { SlideInterface } from '../../../slide/mediator';
import { Slide } from '../../../slide/mediator';
import type { AdocVisitorInterface } from '../../misc/adocVisitor';
import { AdocVisitor } from '../../misc/adocVisitor';
import type { MarkType, SlideType } from '../../misc/slideType';
export class Info extends Slide implements SlideType {
  mark!: MarkType;
  setProperties(props: SlideInterface): void {
    ({ txt: this.txt } = props);
    this.accept(new AdocVisitor());
    this.immediateConclusion = true;
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
    const createHtml = this.createHtml;
    const makeSlidesStrategy = this.makeSlidesStrategy;
    makeSlidesStrategy(txt, createHtml, doc, this);
  }
}
