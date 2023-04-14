import type { AdocVisitorInterface } from '../../../datalayer/mediator';
import { AdocVisitor } from '../../../datalayer/mediator';
import { Slide } from '../../slide';
import type { SlideInterface } from '../../slideInterface';
import type { MarkType, SlideType } from '../slideType';
export class Info extends Slide implements SlideType {
  mark!: MarkType;
  processJson(json: SlideInterface): void {
    const json1 = json as Info;
    ({ txt: this.txt } = json1);
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
