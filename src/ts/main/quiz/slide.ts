import type { Evaluation } from './evaluate';

import { SaveData } from '../quiz/slide/saveData';
import { append, empty } from '../utilities';
import { postRender } from './slide/postRender';
import type { CreateHtmlTypeIntersection } from './slide/strategies/createHtml';
import type { EvaluateType } from './slide/strategies/evaluate';
import type { MakeSlidesType } from './slide/strategies/makeSlides';
import type {
  AnswerType,
  ResultReturnType,
  ResultType,
} from './slide/strategies/result';
const { saveData } = SaveData;

type AnswerTypeIntersection = string & string[];
type ResultTypeIntersection = boolean & boolean[];
export interface SlideInterface /* extends GetScore*/ {
  txt: AnswerType;
  type: string;
  isExercise: boolean;
  pageTemplate: string;
  //Transform human-created YML into computer-friendly JSON
  //Run before quiz starts
  processJson(json: SlideInterface): void;
  //Create slide HTML during quiz
  makeSlides(doc: Document): void;
  //Evaluate user responses at the end of quiz
  //evaluation during quiz is NOT here
  evaluate(): Evaluation;
  setResults(res: AnswerType): void;
  result(): ResultReturnType;
}
export abstract class Slide<T extends AnswerType> implements SlideInterface {
  txt!: AnswerType;
  ans!: T;
  res!: T;
  pageTemplate = `
        <div id="slide">
            <div id="content">
            </div>
        </div>
    `;
  isExercise = false;
  constructor(
    public readonly type: string,
    public readonly createHtml: CreateHtmlTypeIntersection,
    public readonly makeSlidesStrategy: MakeSlidesType,
    public readonly evaluateStrategy: EvaluateType,
    public readonly resultType: ResultType
  ) {}
  abstract processJson(json: SlideInterface): void;
  abstract makeSlides(doc: Document): void;
  //necessary to load results from save file
  setResults(res: T): void {
    this.res = res;
  }
  evaluate(): Evaluation {
    const txt = this.txt as AnswerTypeIntersection;
    const res = this.res as AnswerTypeIntersection;
    const ans = this.ans as AnswerTypeIntersection;
    const result = this.result() as ResultTypeIntersection;
    return this.evaluateStrategy(txt, ans, res, result);
  }
  saveData() {
    const txt = this.txt;
    const res = this.res;
    saveData(txt, res);
  }
  result(): ResultReturnType {
    return this.resultType(this.ans, this.res);
  }
  setRes(res: T): void {
    this.res = res;
  }
  getSetValues() {
    const saveData = () => this.saveData();
    const result = (): ResultReturnType => this.result();
    const setRes = (res: T): void => this.setRes(res);
    return new SetValues<T>(saveData, result, setRes);
  }
  public static createPageContent(html: string, doc: Document): void {
    const element = doc.getElementById('btn') as HTMLElement | null;
    if (element != null) element.remove(); // Removes the div with the 'div-02' id
    empty('#content');
    append('#content', html);
    postRender(document);
  }
}
export class SetValues<T> {
  constructor(
    public readonly saveData: () => void,
    public readonly result: () => ResultReturnType,
    public readonly setRes: (res: T) => void
  ) {}
}
