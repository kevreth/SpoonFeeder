import { Slide, SlideInterface} from '../../slide';
import { EvaluateType } from '../strategies/evaluate';
import { CreateHtmlTypeInfo, CreateHtmlTypeIntersection } from '../strategies/createHtml';
import { MakeSlidesInfoType, MakeSlidesType } from '../strategies/makeSlides';
import { ResultType } from '../strategies/result';
export interface info extends SlideInterface {
  txt: string;
}
export class Info extends Slide<string> {
  constructor(type:string, createHtml: CreateHtmlTypeIntersection, makeSlidesStrategy:MakeSlidesType, evaluateStrategy:EvaluateType, result: ResultType) {
    super(type, createHtml, makeSlidesStrategy, evaluateStrategy, result);
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

