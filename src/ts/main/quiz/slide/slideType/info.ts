import { Slide, SlideInterface} from '../../slide';
import { showSlides } from '../../makeSlides';
import { makeButton } from '../../../utilities';
import { Evaluate } from '../strategies/evaluate';
import { CreateHtml } from '../strategies/createHtml';
export interface info extends SlideInterface {
  txt: string;
}
export class Info extends Slide<string> {
  constructor() {
    super('info',Evaluate.DEFAULT);
  }
  txt = '';
  createHtml = CreateHtml.INFO;
  processJson(json: Info): void {
    this.txt = json.txt;
  }
  makeSlides(doc: Document): void {
    const html = this.createHtml(this.txt);
    this.createPageContent(html, doc);
    this.saveData();
    showButton(doc);
  }
}
  //info has it's own showButton because the continue button
  //appears immediately upon page load and can be in the wrong
  //place because dynamic content in course files may cause it
  //to overlap. It gets placed before the dynamic content loads.

  //The continue button is placed inside #content here, unlike
  //other slide types where doing so causes the content to re-center
  //vertically.
  function showButton(doc: Document): void {
    const button = makeButton('btn', 'continue-button', 'continue');
    const content = doc.getElementById('content') as HTMLElement;
    content.insertAdjacentHTML('beforeend', '<br>' + button);
    const continue_btn = doc.getElementById('btn') as HTMLElement;
    continue_btn?.addEventListener('click', (): void => {
      showSlides(doc);
    });
  }
