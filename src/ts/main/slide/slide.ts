import { SaveData } from '../dataaccess/mediator';
import { Evaluation, adoc2html } from '../quiz/mediator';
import type {
  AdocVisitorInterface,
  AnswerType,
  CreateHtmlType,
  EvaluateType,
  MakeSlidesType,
  ResultReturnType,
  ResultType,
} from '../slidetype/mediator';
import { conclude2 } from './conclude/conclude';
import type { SlideInterface } from './slideInterface';
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
  conclude(doc: Document, res: AnswerType, txt: string): void {
    conclude2(doc, this, res, txt);
  }
  abstract accept(visitor: AdocVisitorInterface): void;
  abstract decorate(doc: Document): boolean;
  abstract setProperties(properties: SlideInterface): void;
  abstract makeSlides(doc: Document): void;
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
    const txt = this.txt as AnswerType;
    const res = this.res as AnswerType;
    const ans = this.ans as AnswerType;
    const result = this.result() as ResultTypeIntersection;
    return this.evaluateStrategy(txt, ans, res, result);
  }
  public saveData() {
    const txt = this.txt;
    const res = this.res;
    SaveData.set(txt, res as AnswerType, false);
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
