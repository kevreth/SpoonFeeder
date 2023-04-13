import reloadPage from '../../../vue/composables/startOver';
import { SaveData } from './datalayer/mediatorDataLayer';
import { showSlides } from './slideDispatcher';
import type { SlideInterface } from './slideInterface';
export function makeButton(id: string, clazz: string, content: string): string {
  return `<button id="${id}" class="${clazz}" type="button">${content}</button>`;
}
export function doneButton() {
  return makeButton('btn', 'done', 'done');
}
export function showButton(doc: Document, txt: string): HTMLElement {
  const continue_btn = continueButton(doc);
  continue_btn?.addEventListener('click', (): void => {
    SaveData.setContinueTrue(txt);
      const explain = doc.getElementById('explainIcon') as HTMLElement;
      explain.style.visibility = 'hidden';
    showSlides(doc);
  });
  return continue_btn;
}
export function continueButton(doc: Document): HTMLElement {
  const container = 'slide';
  const continue_btn = createContinueButton(doc, container, '');
  //as an HTMLElement we can assign styles
  //this wouldn't work when using a stylesheet, not sure why.
  continue_btn.style.position = 'absolute';
  continue_btn.style.marginTop = 10 + 'px';
  continue_btn.style.marginLeft = -2.3 + 'em';
  return continue_btn;
}
export function createContinueButton(
  doc: Document,
  container: string,
  prefix: string
) {
  const button = makeButton('continueBtn', 'continueBtn', 'continue');
  const slide = doc.getElementById(container) as HTMLElement;
  slide.insertAdjacentHTML('beforeend', prefix + button);
  const continue_btn = doc.getElementById('continueBtn') as HTMLElement;
  return continue_btn;
}
export function startOverButton(doc: Document) {
  const startOverText = makeButton('startOver', 'startOver', 'Start Over');
  doc.body.insertAdjacentHTML('beforeend', '<br>' + startOverText);
  const startOver = document.getElementById('startOver') as HTMLElement;
  startOver.addEventListener('click', () => {
    reloadPage();
  });
}
export function showExplainIcon(slide: SlideInterface, doc: Document) {
  if (slide.exp !== undefined && slide.exp !== '') {
    const explain = doc.getElementById('explainIcon') as HTMLElement;
    explain.style.visibility = 'visible';
  }
}
export function hideExplainIcon(doc: Document) {
  const explain = doc.getElementById('explainIcon') as HTMLElement;
  explain.style.visibility = 'hidden';
}
