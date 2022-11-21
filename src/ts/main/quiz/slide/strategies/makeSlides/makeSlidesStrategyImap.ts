import { SVGInjector } from '@tanem/svg-injector';
import { getChildIds } from '../../../../utilities';
import type { SlideInterface } from '../../../slideInterface';
import { conclude } from '../../conclude';
import { createPageContent } from '../../createPageContent';
import type { CreateHtmlTypeImap } from '../createHtmlStrategy';
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
