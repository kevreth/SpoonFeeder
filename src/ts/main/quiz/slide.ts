import { timestampNow } from './slide/date';
import type { AdocVisitorInterface } from './datalayer/mediator';
import { SaveData } from './datalayer/mediator';
import type { Evaluation } from './evaluate';
import type { CreateHtmlTypeIntersection } from './slide/strategies/createHtmlStrategy';
import type { EvaluateType } from './slide/strategies/evaluateStrategy';
import type { MakeSlidesType } from './slide/strategies/makeSlidesStrategy';
import type {
  AnswerType,
  ResultReturnType,
  ResultType,
} from './slide/strategies/resultStrategy';
import type { SlideInterface } from './slideInterface';
type AnswerTypeIntersection = string & string[];
type ResultTypeIntersection = boolean & boolean[];
export abstract class Slide implements SlideInterface {
  txt!: string;
  ans!: AnswerType;
  res!: AnswerType;
  exp!: string;
  ref!: string;
  cont = false;
  immediateConclusion = false;
  public pageTemplate = `
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
  setContinue(): void {
    throw new Error('Method not implemented.');
  }
  o?: AnswerType | undefined;
  numans?: number | undefined;
  abstract accept(visitor: AdocVisitorInterface): void;
  getSlideSet(): SlideInterface[] {
    return new Array<SlideInterface>();
  }
  getAnswerCount(): number {
    return 1;
  }
  abstract decorate(doc: Document): boolean;
  abstract processJson(json: SlideInterface): void;
  abstract makeSlides(doc: Document): void;
  //necessary to load results from save file
  setResults(res: AnswerType): void {
    this.res = res;
  }
  evaluate(): Evaluation {
    const txt = this.txt as AnswerTypeIntersection;
    const res = this.res as AnswerTypeIntersection;
    const ans = this.ans as AnswerTypeIntersection;
    const result = this.result() as ResultTypeIntersection;
    return this.evaluateStrategy(txt, ans, res, result);
  }
  public saveData() {
    const txt = this.txt;
    const res = this.res;
    SaveData.set(txt, res, timestampNow(), false);
  }
  public result(): ResultReturnType {
    return this.resultType(this.ans, this.res);
  }
  public setRes(res: AnswerType): void {
    this.res = res;
  }
  public getRes(): AnswerType {
    return this.res;
  }
  public getAns(): AnswerType {
    return this.ans;
  }
}
