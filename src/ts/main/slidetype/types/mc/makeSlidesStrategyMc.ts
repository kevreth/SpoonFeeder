import type { AnswerType, SlideInterface } from '../../../slide/mediator';
import { createPageContent } from '../../misc/createPageContent/createPageContent';
import type { SetWidthTypeSimple } from '../../strategies/setWidthsStrategy/setWidthsStrategy';
import type { CreateHtmlTypeMc } from './createHtmlMc';
export type MakeSlidesTypeMc = (
  txt: string,
  options: string[],
  createHtml: CreateHtmlTypeMc,
  maxWidthStrategy: SetWidthTypeSimple,
  doc: Document,
  slide: SlideInterface
) => void;
export const makeSlidesStrategyMc: MakeSlidesTypeMc = function (
  txt,
  options,
  createHtml,
  maxWidthStrategy,
  doc,
  slide
) {
  const html = createHtml(txt, options);
  createPageContent(html, doc);
  const numOptions = options.length;
  maxWidthStrategy(numOptions, 'btn', doc);
  options.forEach((option, optionCtr) => {
    addEventListener(doc, option, optionCtr, slide, txt);
  });
};
function addEventListener(
  doc: Document,
  option: string,
  optionCtr: number,
  slide: SlideInterface,
  txt: string
): void {
  const element = doc.getElementById('btn' + optionCtr) as HTMLElement;
  element.addEventListener('click', () => {
    slide.conclude(doc, option as AnswerType, txt);
  });
}
