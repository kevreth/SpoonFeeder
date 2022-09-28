import { SetValues, createPageContent } from '../../../slide';
import { showButton } from '../../../makeSlides';
import { SVGInjector } from '@tanem/svg-injector';
import { getChildIds, removeListener } from '../../../../utilities';
import { CreateHtmlTypeImap } from '../createHtml';

export function makeSlidesStrategyImap(txt: string, img: string, createHtml: CreateHtmlTypeImap, doc: Document, setValues: SetValues<string>) {
  const html = createHtml(txt, img);
  createPageContent(html, doc);
  const picture = doc.getElementById('imagemap');
  //inject SVG into page so it is part of DOM
  SVGInjector(picture, { afterAll() { afterAll(setValues, doc); } });
}
function afterAll(setValues: SetValues<string>, doc: Document) {
  const ids = getChildIds(doc, 'imagemap');
  ids.forEach((id) => {
    const element = doc.getElementById(id) as HTMLElement;
    element.addEventListener('click', () => {
      ids.forEach((id) => {
        const element = doc.getElementById(id) as HTMLElement;
        element.classList.remove('shape');
        removeListener(element);
      });
      setValues.setRes(id);
      const element = doc.getElementById(id) as HTMLElement;
      let classname = 'shape_incorrect';
      if (setValues.result())
        classname = 'shape_correct';
      element.classList.add(classname);
      setValues.saveData();
      showButton(doc);
    });
  });
}
