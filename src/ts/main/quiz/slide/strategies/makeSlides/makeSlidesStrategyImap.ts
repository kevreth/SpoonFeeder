import { SVGInjector } from '@tanem/svg-injector';
import { getChildIds } from '../../../../utilities';
import { showButton } from '../../../makeSlides';
import type { SlideInterface } from '../../../slideInterface';
import { playAudio } from '../../audio';
import { createPageContent } from '../../createPageContent';
import type { CreateHtmlTypeImap } from '../createHtmlStrategy';
export function makeSlidesStrategyImap(
  txt: string,
  img: string,
  createHtml: CreateHtmlTypeImap,
  doc: Document,
  setValues: SlideInterface
) {
  const html = createHtml(txt, img);
  createPageContent(html, doc);
  const picture = doc.getElementById('imagemap');
  //inject SVG into page so it is part of DOM
  SVGInjector(picture, {
    afterAll() {
      addEventListener(setValues, doc, txt);
    },
  });
}
function addEventListener(
  setValues: SlideInterface,
  doc: Document,
  txt: string
) {
  const ids = getChildIds(doc, 'imagemap');
  ids.forEach((id) => {
    const element = doc.getElementById(id) as HTMLElement;
    element.addEventListener('click', () => {
      conclude(doc, setValues, id, txt);
    });
  });
}
function conclude(
  doc: Document,
  setValues: SlideInterface,
  id: string,
  txt: string
) {
  setValues.setRes(id);
  setValues.saveData();
  const isCorrect = setValues.decorate(setValues, doc);
  playAudio(isCorrect);
  showButton(doc, txt);
}
