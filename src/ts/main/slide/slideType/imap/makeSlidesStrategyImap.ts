import { SVGInjector } from '@tanem/svg-injector';
import { getChildIds } from '../../../quiz/utilities';
import { conclude } from '../../conclude/conclude';
import { createPageContent } from '../../createPageContent/createPageContent';
import type { SlideInterface } from '../../slideInterface';
import type { AnswerType } from '../../strategies/resultStrategy';
import type { CreateHtmlTypeImap } from './createHtmlImap';
export type MakeSlidesTypeImap = (
  txt: string,
  img: string,
  createHtml: CreateHtmlTypeImap,
  doc: Document,
  slide: SlideInterface
) => void;
export const makeSlidesStrategyImap: MakeSlidesTypeImap = function (
  txt,
  img,
  createHtml,
  doc,
  slide
) {
  const html = createHtml(txt, img);
  createPageContent(html, doc);
  const picture = doc.getElementById('imagemap');
  //inject SVG into page so it is part of DOM
  SVGInjector(picture, {
    afterAll() {
      addEventListener(slide, doc, txt);
    },
  });
};
function addEventListener(slide: SlideInterface, doc: Document, txt: string) {
  const ids = getChildIds(doc, 'imagemap');
  ids.forEach((id) => {
    const element = doc.getElementById(id) as HTMLElement;
    element.addEventListener('click', () => {
      conclude(doc, slide, id as AnswerType, txt);
    });
  });
}
