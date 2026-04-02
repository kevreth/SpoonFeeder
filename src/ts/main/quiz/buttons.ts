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
  continue_btn?.addEventListener('click', (): void => {
    SaveData.setContinueTrue(txt);
    const explain = doc.getElementById('explainIcon') as HTMLElement;
    explain.style.visibility = 'hidden';
    showSlides(doc);
  });
  return continue_btn;
}
export function startOverButton(doc: Document) {
  const container = doc.createElement('div');
  container.style.background = 'transparent';
  container.style.textAlign = 'center';
  container.style.padding = '24px 0 8px';
  container.innerHTML = makeButton('startOver', 'startOver', 'Start Over');
  const wrapper = doc.querySelector('.summary-wrapper') as HTMLElement | null;
  if (wrapper) {
    wrapper.appendChild(container);
  } else {
    doc.body.appendChild(container);
  }
  const startOver = doc.getElementById('startOver') as HTMLElement;
  startOver.style.background = 'transparent';
  startOver.style.border = '1px solid rgba(0, 191, 255, 0.5)';
  startOver.style.color = '#00bfff';
  startOver.style.padding = '10px 30px';
  startOver.style.borderRadius = '8px';
  startOver.style.boxShadow = 'none';
  startOver.addEventListener('click', () => reloadPage());
}
