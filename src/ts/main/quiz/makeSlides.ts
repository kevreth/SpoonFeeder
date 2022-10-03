import reloadPage from '../../../composables/startOver';
import { Json } from '../globals';
import { makeButton } from '../utilities';
import { evaluate } from './evaluate/evaluate.support';
import { SaveData } from './slide/saveData';
const { get: getSavedDataArray } = SaveData;
///////////////// PHASE 3: make slides
export class MakeSlides {
  public static showSlides(doc: Document): void {
    const slide = Json.getSlide();
    const arr = getSavedDataArray();
    if (typeof slide === 'undefined') {
      //end of quiz
      doc.body.innerHTML = evaluate(); //EXECUTION ENDS
      MakeSlides.startOverButton(doc);
    }
    //If the slide has already been presented to the user,
    //call this method again.
    //"txt" identifies slides, which may be in random order.
    else if (arr.some((x) => x.txt === slide.txt)) {
      //load the results from the save file
      const idx = arr.findIndex((x) => x.txt === slide.txt);
      slide.setResults(arr[idx].result);
      MakeSlides.showSlides(doc);
    } else slide.makeSlides(doc);
  }
  public static showButton(doc: Document): HTMLElement {
    const continue_btn = MakeSlides.continueButton(doc);
    continue_btn?.addEventListener('click', (): void => {
      MakeSlides.showSlides(doc);
    });
    return continue_btn;
  }
  public static continueButton(doc: Document): HTMLElement {
    const container = 'slide';
    const continue_btn = MakeSlides.createContinueButton(doc, container, '');
    //as an HTMLElement we can assign styles
    //this wouldn't work when using a stylesheet, not sure why.
    continue_btn.style.position = 'absolute';
    continue_btn.style.marginTop = 10 + 'px';
    continue_btn.style.marginLeft = -2.3 + 'em';
    return continue_btn;
  }
  public static createContinueButton(
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

  private static startOverButton(doc: Document) {
    const startOverText = makeButton('startOver', 'startOver', 'Start Over');
    doc.body.insertAdjacentHTML('beforeend', '<br>' + startOverText);
    const startOver = document.getElementById('startOver') as HTMLElement;
    startOver.addEventListener('click', () => {
      reloadPage();
    });
  }
}
