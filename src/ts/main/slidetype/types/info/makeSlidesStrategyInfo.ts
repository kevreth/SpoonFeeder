import type { AnswerType, SlideInterface } from '../../../slide/mediator';
import { createPageContent } from '../../misc/createPageContent/createPageContent';
import type { CreateHtmlTypeInfo } from './createHtmlInfo';
export type MakeSlidesTypeInfo = (
  txt: string,
  createHtml: CreateHtmlTypeInfo,
  doc: Document,
  setValues: SlideInterface
) => void;
export const makeSlidesStrategyInfo: MakeSlidesTypeInfo = function (
  txt,
  createHtml,
  doc,
  slide
) {
  const html = createHtml(txt);
  createPageContent(html, doc);
  slide.conclude(doc, '' as AnswerType, txt);
};
