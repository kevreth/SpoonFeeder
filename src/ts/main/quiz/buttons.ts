import reloadPage from '../../../vue/composables/startOver';
import { SaveData, showSlides } from '../dataaccess/mediator';
export function makeButton(id: string, clazz: string, content: string): string {
  return `<button id="${id}" class="${clazz}" type="button">${content}</button>`;
}
export function doneButton() {
  return makeButton('btn', 'done', 'done');
}
export function continueButton(doc: Document, txt: string): HTMLElement {
  const button = makeButton('continueBtn', 'continueBtn', 'continue');
  const slide = doc.getElementById('slide') as HTMLElement;
  slide.insertAdjacentHTML('beforeend', button);
  const continue_btn = doc.getElementById('continueBtn') as HTMLElement;
  //as an HTMLElement we can assign styles
  //this wouldn't work when using a stylesheet, not sure why.
  continue_btn.style.position = 'absolute';
  continue_btn.style.marginTop = 10 + 'px';
  continue_btn.style.marginLeft = -2.3 + 'em';
  continue_btn?.addEventListener('click', (): void => {
    SaveData.setContinueTrue(txt);
    const explain = doc.getElementById('explainIcon') as HTMLElement;
    explain.style.visibility = 'hidden';
    showSlides(doc);
  });
  return continue_btn;
}
export function startOverButton(doc: Document) {
  const startOverText = makeButton('startOver', 'startOver', 'Start Over');
  doc.body.insertAdjacentHTML('beforeend', '<br>' + startOverText);
  const startOver = doc.getElementById('startOver') as HTMLElement;
  startOver.addEventListener('click', () => reloadPage());
}
