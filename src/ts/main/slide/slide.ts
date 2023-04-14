import type { AdocVisitorInterface } from '../datalayer/mediator'
import { SaveData } from '../datalayer/mediator'
import type { Evaluation } from '../quiz/evaluate'
import { timestampNow } from './date'
import type { SlideInterface } from './slideInterface'
import { CreateHtmlType } from './strategies/createHtmlStrategy'
import type { EvaluateType } from './strategies/evaluateStrategy'
import type { MakeSlidesType } from './strategies/makeSlidesStrategy'
import type {
  AnswerType,
  ResultReturnType,
  ResultType,
} from './strategies/resultStrategy'
type ResultTypeIntersection = boolean & boolean[];
export abstract class Slide implements SlideInterface {
  txt!: string;
  ans!: AnswerType;
  res?: AnswerType;
  exp?: string;
  ref?: string;
  o?: string[];
  list?: Map<string, string>
  numans?: number;
  cont = false;
  isExercise = false;
  immediateConclusion = false;
  constructor(
    public readonly type: string,
    public readonly createHtml: CreateHtmlType,
    public readonly makeSlidesStrategy: MakeSlidesType,
    public readonly evaluateStrategy: EvaluateType,
    public readonly resultType: ResultType
  ) {}
  abstract accept(visitor: AdocVisitorInterface): void;
  abstract decorate(doc: Document): boolean;
  abstract processJson(json: SlideInterface): void;
  abstract makeSlides(doc: Document): void;
  setContinue(): void {
    throw new Error('Method not implemented.');
  }
  getSlideSet(): SlideInterface[] {
    return new Array<SlideInterface>();
  }
  getAnswerCount(): number {
    return 1;
  }
  //necessary to load results from save file
  setResults(res: AnswerType): void {
    this.res = res;
  }
  evaluate(): Evaluation {
    const txt = this.txt as AnswerType;
    const res = this.res as AnswerType;
    const ans = this.ans as AnswerType;
    const result = this.result() as ResultTypeIntersection;
    return this.evaluateStrategy(txt, ans, res, result);
  }
  public saveData() {
    const txt = this.txt;
    const res = this.res;
    SaveData.set(txt, res as AnswerType, timestampNow(), false);
  }
  public result(): ResultReturnType {
    return this.resultType(this.ans, this.res as AnswerType);
  }
  public setRes(res: AnswerType): void {
    this.res = res;
  }
  public getRes(): AnswerType {
    return this.res as AnswerType;
  }
  public getAns(): AnswerType {
    return this.ans;
  }
}
