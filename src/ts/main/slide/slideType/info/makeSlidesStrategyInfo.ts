import type { SlideInterface } from '../../slideInterface';
import { conclude } from '../../conclude/conclude';
import { createPageContent } from '../../createPageContent/createPageContent';
import type { CreateHtmlTypeInfo } from './createHtmlInfo';
export type MakeSlidesTypeInfo = (
  txt: string,
  createHtml: CreateHtmlTypeInfo,
  doc: Document,
  setValues: SlideInterface
) => void;
export function makeSlidesStrategyInfo(
  txt: string,
  createHtml: CreateHtmlTypeInfo,
  doc: Document,
  slide: SlideInterface
) {
  const html = createHtml(txt);
  createPageContent(html, doc);
  conclude(doc, slide, '', txt);
}
