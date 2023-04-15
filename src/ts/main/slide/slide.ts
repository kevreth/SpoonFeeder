import type { AdocVisitorInterface } from '../datalayer/mediator';
import { SaveData } from '../datalayer/mediator';
import type { Evaluation } from '../quiz/evaluate';
import { timestampNow } from './date';
import type { SlideInterface } from './slideInterface';
import type { CreateHtmlType } from './strategies/createHtmlStrategy';
import type { EvaluateType } from './strategies/evaluateStrategy';
import type { MakeSlidesType } from './strategies/makeSlidesStrategy';
import type {
  AnswerType,
  ResultReturnType,
  ResultType,
} from './strategies/resultStrategy';
type ResultTypeIntersection = boolean & boolean[];
export abstract class Slide implements SlideInterface {
  txt = '';
  cont = false;
  exp = '';
  ref = '';
  isExercise = false;
  immediateConclusion = false;
  ans = '' as AnswerType;
  res = '' as AnswerType;
  o: string[] = [];
  inst = '';
  img = '';
  numans = 0;
  list: Map<string, string> = new Map<string, string>();
  set: Array<SlideInterface> = [];
  constructor(
    public readonly type: string,
    public readonly createHtml: CreateHtmlType,
    public readonly makeSlidesStrategy: MakeSlidesType,
    public readonly evaluateStrategy: EvaluateType,
    public readonly resultType: ResultType
  ) {}
  abstract accept(visitor: AdocVisitorInterface): void;
  abstract decorate(doc: Document): boolean;
  abstract setProperties(properties: SlideInterface): void;
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
