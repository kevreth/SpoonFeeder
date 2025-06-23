import { SVGInjector } from '@tanem/svg-injector';
import { getChildIds } from '../../../quiz/mediator';
import type { AnswerType, SlideInterface } from '../../../slide/mediator';
import { createPageContent } from '../../misc/createPageContent/createPageContent';
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
      slide.conclude(doc, id as AnswerType, txt);
    });
  });
}
