import { SVGInjector } from '@tanem/svg-injector';
import { getChildIds, removeListener } from '../../../../utilities';
import { showButton } from '../../../makeSlides';
import { playAudio } from '../../audio';
import { createPageContent } from '../../createPageContent';
import type { SetValues } from '../../setValues';
import type { CreateHtmlTypeImap } from '../createHtmlStrategy';
export function makeSlidesStrategyImap(
  txt: string,
  img: string,
  createHtml: CreateHtmlTypeImap,
  doc: Document,
  setValues: SetValues
) {
  const html = createHtml(txt, img);
  createPageContent(html, doc);
  const picture = doc.getElementById('imagemap');
  //inject SVG into page so it is part of DOM
  SVGInjector(picture, {
    afterAll() {
      afterAll(setValues, doc, txt);
    },
  });
}
function afterAll(setValues: SetValues, doc: Document, txt: string) {
  const ids = getChildIds(doc, 'imagemap');
  ids.forEach((id) => {
    const element = doc.getElementById(id) as HTMLElement;
    element.addEventListener('click', () => {
      conclude(ids, doc, setValues, id, txt);
    });
  });
}
function conclude(
  ids: string[],
  doc: Document,
  setValues: SetValues,
  id: string,
  txt: string
) {
  ids.forEach((id) => {
    const element = doc.getElementById(id) as HTMLElement;
    element.classList.remove('shape');
    removeListener(element);
  });
  setValues.setRes(id);

  //icCorrect
  const isCorrect = setValues.result() as boolean;
  const classname = isCorrect ? 'shape_correct' : 'shape_incorrect';
  /////
  playAudio(isCorrect);

  const element = doc.getElementById(id) as HTMLElement;
  element.classList.add(classname);
  setValues.saveData();
  showButton(doc, txt);
}
