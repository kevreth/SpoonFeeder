import reloadPage from '../../../composables/startOver';
import { Json } from '../globals';
import { makeButton } from '../utilities';
import { evaluate } from './evaluate';
import { Slide } from './slide';
import { SaveData } from './slide/saveData';
import type { SlideInterface } from './slideInterface';
const { get: getSavedDataArray } = SaveData;
///////////////// PHASE 2: make slides
export class MakeSlides {
  public static showSlides(doc: Document): void {
    const slide = Json.getSlide();
    const saves = getSavedDataArray();
    if (typeof slide === 'undefined') MakeSlides.endQuiz(doc);
    else {
      const idx = Slide.getSlideSavedIndex(saves, slide.txt);
      const savedFlag = idx > -1;
      let contFlag = false;
      if (savedFlag) contFlag = saves[idx].cont;
      if (contFlag) {
        console.log('reload ', slide.txt.slice(0, 6), Json.count());
        MakeSlides.reloadSlide(slide, idx, doc);
        MakeSlides.showSlides(doc);
      } else if (savedFlag) {
        console.log('saved ', slide.txt.slice(0, 6), Json.count());
        MakeSlides.reloadSlide(slide, idx, doc);
        slide.makeSlides(doc);
        slide.decorate(doc);
        showButton(doc, slide.txt);
      } else {
        console.log('make ', slide.txt.slice(0, 6), Json.count());
        slide.makeSlides(doc);
      }
    }
  }
  //The slide has already been presented to the user, as will happen on reload.
  public static reloadSlide(slide: SlideInterface, idx: number, doc: Document) {
    const saves = getSavedDataArray();
    const savedSlide = saves[idx];
    const result = savedSlide.result;
    slide.setResults(result);
  }
  private static endQuiz(doc: Document) {
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
