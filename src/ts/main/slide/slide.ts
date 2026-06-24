import type {
  AdocVisitorInterface,
  AnswerType,
  EvaluateType,
  ResultReturnType,
  ResultType,
} from '../slidetype/index';
import type { SlideInterface } from './index';
import { Evaluation } from '../quiz/evaluation';
import { SaveData } from '../dataaccess/saveData/saveData';
import { adoc2html } from './adoc2html';
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
    public readonly evaluateStrategy: EvaluateType,
    public readonly resultType: ResultType
  ) {}
  abstract accept(visitor: AdocVisitorInterface): void;
  abstract setProperties(properties: SlideInterface): void;
  //currently unused, awaiting removal of adocVisitor
  applyAdoc(): void {
    this.txt = adoc2html(this.txt);
    this.exp = adoc2html(this.exp);
    this.ref = adoc2html(this.ref);
    this.o = this.o.map((item) => adoc2html(item));
  }
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
    const txt = this.txt;
    const res = this.res as AnswerType;
    const ans = this.ans as AnswerType;
    const result = this.result() as ResultTypeIntersection;
    return this.evaluateStrategy(txt, ans, res, result);
  }
  public async saveData(): Promise<void> {
    await SaveData.set(this.txt, this.res as AnswerType, false);
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
