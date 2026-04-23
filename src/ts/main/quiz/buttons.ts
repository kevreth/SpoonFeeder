import { SaveData } from '../dataaccess/saveData/saveData';
import { showSlides } from './slideDispatcher';
export function makeButton(id: string, clazz: string, content: string): string {
  return `<button id="${id}" class="${clazz}" type="button">${content}</button>`;
}
export function doneButton() {
  return makeButton('btn', 'done', 'done');
}
export function continueButton(
  doc: Document,
  txt: string,
  slideIdx?: number
): HTMLElement {
  const button = makeButton('continueBtn', 'continueBtn', 'continue');
  const slide = doc.getElementById('slide') as HTMLElement;
  doc.getElementById('continueBtn')?.remove();
  slide.insertAdjacentHTML('beforeend', button);
  const continue_btn = doc.getElementById('continueBtn') as HTMLElement;
  //as an HTMLElement we can assign styles
  //this wouldn't work when using a stylesheet, not sure why.
  continue_btn?.addEventListener('click', (): void => {
    SaveData.setContinueTrue(txt, slideIdx);
    const explain = doc.getElementById('explainIcon') as HTMLElement;
    explain.style.visibility = 'hidden';
    showSlides(doc);
  });
  return continue_btn;
}
