import reloadPage from '../../../composables/startOver';
import { Json } from '../globals';
import { isEqual, makeButton } from '../utilities';
import { evaluate } from './evaluate/evaluate.support';
import { SaveData } from './slide/saveData';
import type { SlideInterface } from './slideInterface';
const { get: getSavedDataArray } = SaveData;
///////////////// PHASE 3: make slides
export class MakeSlides {
  public static showSlides(doc: Document): void {
    const slide = Json.getSlide();
    let idx = 0;
    if (typeof slide === 'undefined') MakeSlides.endQuiz(doc);
    //"txt" identifies slides, which may be in random order.
    else if (reloadSlideCriteria()) MakeSlides.reloadSlide(slide, idx, doc);
    else slide.makeSlides(doc);

    function reloadSlideCriteria() {
      const arr = getSavedDataArray();
      const sTxt = slide.txt;
      return (idx = arr.findIndex((x) => isEqual(x.txt, sTxt))) > -1;
    }
  }
  //The slide has already been presented to the user, as will happen on reload.
  private static reloadSlide(
    slide: SlideInterface,
    idx: number,
    doc: Document
  ) {
    const arr = getSavedDataArray();
    slide.setResults(arr[idx].result);
    MakeSlides.showSlides(doc);
  }

  private static endQuiz(doc: Document) {
    Json.reset();
    doc.body.innerHTML = evaluate(Json.get()); //EXECUTION ENDS
    startOverButton(doc);
  }
}
export function showButton(doc: Document): HTMLElement {
  const continue_btn = continueButton(doc);
  continue_btn?.addEventListener('click', (): void => {
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
