import { makeButton } from '../../../../utilities';
import { MakeSlides } from '../../../makeSlides';
import { SetValues, Slide } from '../../../slide';
import type { CreateHtmlTypeInfo } from '../createHtml';
const { createPageContent } = Slide;
const { showSlides } = MakeSlides;

export function makeSlidesStrategyInfo(
  txt: string,
  createHtml: CreateHtmlTypeInfo,
  doc: Document,
  setValues: SetValues<string>
) {
  const html = createHtml(txt);
  createPageContent(html, doc);
  setValues.saveData();
  showButton(doc);
}
//info has it's own showButton because the continue button
//appears immediately upon page load and can be in the wrong
//place because dynamic content in course files may cause it
//to overlap. It gets placed before the dynamic content loads.
//The continue button is placed inside #content here, unlike
//other slide types where doing so causes the content to re-center
//vertically.
function showButton(doc: Document): void {
  const button = makeButton('btn', 'continue-button', 'continue');
  const content = doc.getElementById('content') as HTMLElement;
  content.insertAdjacentHTML('beforeend', '<br>' + button);
  const continue_btn = doc.getElementById('btn') as HTMLElement;
  continue_btn?.addEventListener('click', (): void => {
    showSlides(doc);
  });
}
