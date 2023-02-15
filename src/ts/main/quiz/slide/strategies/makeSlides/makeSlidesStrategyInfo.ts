import { createContinueButton, MakeSlides } from '../../../makeSlides';
import type { SlideInterface } from '../../../slideInterface';
import { createPageContent } from '../../createPageContent';
import { SaveData } from '../../saveData';
import type { CreateHtmlTypeInfo } from '../createHtmlStrategy';
export function makeSlidesStrategyInfo(
  txt: string,
  createHtml: CreateHtmlTypeInfo,
  doc: Document,
  slide: SlideInterface
) {
  const html = createHtml(txt);
  createPageContent(html, doc);
  conclude(slide, doc, txt);
}
function conclude(slide: SlideInterface, doc: Document, txt: string) {
  slide.saveData();
  showButton(doc, txt);
}
//info has it's own showButton because the continue button
//appears immediately upon page load and can be in the wrong
//place because dynamic content in course files may cause it
//to overlap. It gets placed before the dynamic content loads.
//The continue button is placed inside #content here, unlike
//other slide types where doing so causes the content to re-center
//vertically.
function showButton(doc: Document, txt: string): void {
  const container = 'content';
  const continue_btn = createContinueButton(doc, container, '<br>');
  continue_btn.addEventListener('click', (): void => {
    SaveData.setContinueTrue(txt);
    MakeSlides.showSlides(doc);
    const event = new Event('updateData');
    window.dispatchEvent(event);
  });
}
