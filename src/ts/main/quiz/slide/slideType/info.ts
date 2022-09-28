import { Slide, SlideInterface} from '../../slide';
import { CreateHtmlTypeInfo } from '../strategies/createHtml';
import { MakeSlidesInfoType } from '../strategies/makeSlides';
export interface info extends SlideInterface {
  txt: string;
}
export class Info extends Slide<string> {
  processJson(json: Info): void {
    this.txt = json.txt;
  }
  makeSlides(doc: Document): void {
    const txt = (this.txt as string);
    const setValues = this.getSetValues();
    const createHtml =(this.createHtml as CreateHtmlTypeInfo);
    const makeSlidesStrategy = (this.makeSlidesStrategy as MakeSlidesInfoType);
    makeSlidesStrategy(txt, createHtml, doc, setValues);
  }
}

