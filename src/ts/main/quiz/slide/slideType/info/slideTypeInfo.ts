import type { AdocVisitorInterface } from '../../../datalayer/mediatorDataLayer';
import { AdocVisitor } from '../../../datalayer/mediatorDataLayer';
import { Slide } from '../../../slide';
import type { SlideInterface } from '../../../slideInterface';
import type { CreateHtmlTypeInfo } from '../../strategies/createHtmlStrategy';
import type { MarkType, SlideType } from '../slideType';
import { MakeSlidesTypeInfo } from './makeSlidesStrategyInfo';
export class Info extends Slide implements SlideType  {
  mark!: MarkType;
  processJson(json: SlideInterface): void {
    const json1 = json as Info
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
    const createHtml = this.createHtml as CreateHtmlTypeInfo;
    const makeSlidesStrategy = this.makeSlidesStrategy as MakeSlidesTypeInfo;
    makeSlidesStrategy(txt, createHtml, doc, this);
  }
}
