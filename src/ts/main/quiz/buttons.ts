import { SaveData } from '../dataaccess/saveData/saveData';
import { showSlides } from './slideDispatcher';
import { Json } from '../dataaccess/saveData/saveFile';
import { firePreAdvanceHook } from '../review/reviewBridge';

export function makeButton(id: string, clazz: string, content: string): string {
  return `<button id="${id}" class="${clazz}" type="button">${content}</button>`;
}

export function doneButton() {
  return makeButton('btn', 'done', 'done');
}

export function continueButton(doc: Document, txt: string): HTMLElement {
  const button = makeButton('continueBtn', 'continueBtn', 'continue');
  const slide = doc.getElementById('slide') as HTMLElement;
  doc.getElementById('continueBtn')?.remove();
  slide.insertAdjacentHTML('beforeend', button);
  const continue_btn = doc.getElementById('continueBtn') as HTMLElement;
  continue_btn?.addEventListener('click', async (): Promise<void> => {
    await SaveData.setContinueTrue(txt);
    const explain = doc.getElementById('explainIcon') as HTMLElement;
    explain.style.visibility = 'hidden';
    const nextSlideIndex = Json.findMatchingSlide(txt) + 1;
    await firePreAdvanceHook(nextSlideIndex);
    await showSlides(doc);
  });
  return continue_btn;
}
