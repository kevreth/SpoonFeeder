import type { SlideInterface } from '../../../slideInterface';
import { conclude } from '../../conclude';
import { createPageContent } from '../../createPageContent';
import type { CreateHtmlTypeInfo } from '../createHtmlStrategy';
export function makeSlidesStrategyInfo(
  txt: string,
  createHtml: CreateHtmlTypeInfo,
  doc: Document,
  slide: SlideInterface
) {
  const html = createHtml(txt);
  createPageContent(html, doc);
  slide.cont = true;
  conclude(doc, slide, '', txt);
}
