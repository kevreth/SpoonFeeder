import { Slide, SlideInterface} from '../../slide';
import { Evaluate } from '../strategies/evaluate';
import { CreateHtml } from '../strategies/createHtml';
import { MakeSlides } from '../strategies/makeSlides';
import { Result } from '../strategies/result';
export interface info extends SlideInterface {
  txt: string;
}
export class Info extends Slide<string> {
  constructor() {
    super('info',Evaluate.DEFAULT, Result.UNSUPPORTED);
  }
  txt = '';
  createHtml = CreateHtml.INFO;
  makeSlidesStrategy = MakeSlides.INFO;
  processJson(json: Info): void {
    this.txt = json.txt;
  }
  makeSlides(doc: Document): void {
    const txt = this.txt;
    const setValues = this.getSetValues();
    const createHtml = this.createHtml;
    this.makeSlidesStrategy(txt, createHtml, doc, setValues);
  }
}

