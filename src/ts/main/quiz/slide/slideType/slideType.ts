import { AdocVisitorInterface } from '../../datalayer/adocVisitor';
import { SlideInterface } from '../../slideInterface';

export interface SlideType {
  processJson(json: SlideInterface): void;
  accept(visitor: AdocVisitorInterface): void;
  makeSlides(doc: Document): void
  decorate(doc: Document): boolean;
}
