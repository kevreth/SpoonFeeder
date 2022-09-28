import { Slide, SlideInterface} from '../../slide';
import { Evaluate } from '../strategies/evaluate';
import { CreateHtml, CreateHtmlTypeInfo } from '../strategies/createHtml';
import { MakeSlides, MakeSlidesInfoType } from '../strategies/makeSlides';
import { Result } from '../strategies/result';
export interface info extends SlideInterface {
  txt: string;
}
export class Info extends Slide<string> {
  constructor() {
    super('info', CreateHtml.INFO, MakeSlides.INFO, Evaluate.DEFAULT, Result.UNSUPPORTED);
  }
  txt = '';
  processJson(json: Info): void {
    this.txt = json.txt;
  }
  makeSlides(doc: Document): void {
    const txt = this.txt;
    const setValues = this.getSetValues();
    const createHtml =(this.createHtml as CreateHtmlTypeInfo);
    const makeSlidesStrategy = (this.makeSlidesStrategy as MakeSlidesInfoType);
    makeSlidesStrategy(txt, createHtml, doc, setValues);
  }
}

