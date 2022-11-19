import { SVGInjector } from '@tanem/svg-injector';
import { getChildIds } from '../../../../utilities';
import { showButton } from '../../../makeSlides';
import type { SlideInterface } from '../../../slideInterface';
import { playAudio } from '../../audio';
import { createPageContent } from '../../createPageContent';
import type { CreateHtmlTypeImap } from '../createHtmlStrategy';
import type { AnswerType } from '../resultStrategy';
export function makeSlidesStrategyImap(
  txt: string,
  img: string,
  createHtml: CreateHtmlTypeImap,
  doc: Document,
  slide: SlideInterface
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
}
function addEventListener(slide: SlideInterface, doc: Document, txt: string) {
  const ids = getChildIds(doc, 'imagemap');
  ids.forEach((id) => {
    const element = doc.getElementById(id) as HTMLElement;
    element.addEventListener('click', () => {
      conclude(doc, slide, id, txt);
    });
  });
}
function conclude(
  doc: Document,
  slide: SlideInterface,
  res: AnswerType,
  txt: string
) {
  slide.setRes(res);
  slide.saveData();
  const isCorrect = slide.decorate(doc);
  playAudio(isCorrect);
  showButton(doc, txt);
}
