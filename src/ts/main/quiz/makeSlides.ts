import reloadPage from '../../../composables/startOver';
import { Json } from './datalayer/globals';
import { makeButton } from '../utilities';
import { evaluate } from './evaluate';
import { SaveData } from './datalayer/saveData';
import { MakeSlides2, SlideSave, SlideSaveMethods } from './datalayer/slideSave';
///////////////// PHASE 2: make slides
export class MakeSlides {
  public static showSlides(doc: Document): void {
    const ss = new SlideSave(Json.get(),SaveData.get(),new SlideSaveMethods());
    const slide = ss.getCurrentSlide();
    const makeSlides = new MakeSlides2(slide,doc);
    ss.getSlide(slide,makeSlides);
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
