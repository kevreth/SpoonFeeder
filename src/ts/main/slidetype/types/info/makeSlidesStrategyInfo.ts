import { createPageContent } from '../../../slide/createPageContent/createPageContent';
import type { SlideInterface } from '../../../slide/mediator';
import type { AnswerType } from '../../strategies/resultStrategy';
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
  createPageContent( html, doc );
  slide.conclude(doc, '' as AnswerType, txt);
};
