import { conclude } from '../../conclude/conclude';
import { createPageContent } from '../../createPageContent/createPageContent';
import type { SlideInterface } from '../../slideInterface';
import type { AnswerType } from '../../strategies/resultStrategy';
import type { SetWidthTypeSimple } from '../../strategies/setWidthsStrategy/setWidthsStrategy';
import type { CreateHtmlTypeMc } from './createHtmlMc';
export type MakeSlidesTypeMc = (
  txt: string,
  options: string[],
  createHtml: CreateHtmlTypeMc,
  maxWidthStrategy: SetWidthTypeSimple,
  doc: Document,
  setValues: SlideInterface
) => void;
export function makeSlidesStrategyMc(
  txt: string,
  options: string[],
  createHtml: CreateHtmlTypeMc,
  maxWidthStrategy: SetWidthTypeSimple,
  doc: Document,
  slide: SlideInterface
) {
  const html = createHtml(txt, options);
  createPageContent(html, doc);
  const numOptions = options.length;
  maxWidthStrategy(numOptions, 'btn', doc);
  options.forEach((option, optionCtr) => {
    addEventListener(doc, option, optionCtr, slide, txt);
  });
}
function addEventListener(
  doc: Document,
  option: string,
  optionCtr: number,
  slide: SlideInterface,
  txt: string
): void {
  const element = doc.getElementById('btn' + optionCtr) as HTMLElement;
  element.addEventListener('click', () => {
    conclude(doc, slide, option as AnswerType, txt);
  });
}
