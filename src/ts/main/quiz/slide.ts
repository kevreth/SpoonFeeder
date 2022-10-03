import type { Evaluation } from './evaluate/evaluate';

import { SaveData } from '../quiz/slide/saveData';
import { SetValues } from './slide/setValues';
import type { CreateHtmlTypeIntersection } from './slide/strategies/createHtmlStrategy';
import type { EvaluateType } from './slide/strategies/evaluateStrategy';
import type { MakeSlidesType } from './slide/strategies/makeSlidesStrategy';
import type {
  AnswerType,
  ResultReturnType,
  ResultType,
} from './slide/strategies/resultStrategy';
import type { SlideInterface } from './slideInterface';
const { set: saveData } = SaveData;
type AnswerTypeIntersection = string & string[];
type ResultTypeIntersection = boolean & boolean[];
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
}
