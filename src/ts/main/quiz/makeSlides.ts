import reloadPage from '../../../composables/startOver';
import { Json } from './datalayer/globals';
import { makeButton } from '../utilities';
import { evaluate } from './evaluate';
import { SaveData } from './datalayer/saveData';
const { get: getSavedDataArray } = SaveData;
///////////////// PHASE 2: make slides
export class MakeSlides {
  public static showSlides(doc: Document): void {
    const slide = Json.getSlide();
    if (typeof slide === 'undefined') //no slides left
      MakeSlides.endQuiz(doc);
    else { //more slides to work
      const saves = getSavedDataArray();
      const idx = SaveData.find(slide.txt, saves);
      const savedFlag = idx > -1;
      let contFlag = false;
      const saved = saves[idx];
      if (savedFlag) contFlag = saved.cont;
      // saved and continued
      if (contFlag) { // go to next slide
        slide.setResults(saved.result);
        MakeSlides.showSlides(doc);
      }
      // saved, not continued; show answered state of current slide
      else if (savedFlag) {
        slide.setResults(saved.result);
        slide.makeSlides(doc);
        slide.decorate(doc);
        showButton(doc, slide.txt);
      }
      // neither saved nor continued; show current slide awaiting answering
      else slide.makeSlides(doc);
    }
  }
  public static endQuiz(doc: Document) {
    Json.reset();
    const json = Json.get();
    doc.body.innerHTML = evaluate(json); //EXECUTION ENDS
    startOverButton(doc);
  }
}
export function showButton(doc: Document, txt: string): HTMLElement {
  const continue_btn = continueButton(doc);
  continue_btn?.addEventListener('click', (): void => {
    SaveData.setContinueTrue(txt);
    MakeSlides.showSlides(doc);
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
