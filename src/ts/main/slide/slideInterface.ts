import type {
  AdocVisitorInterface,
  CreateHtmlType,
  EvaluateType, Evaluation, MakeSlidesType
} from './mediator';
export type AnswerType = string & Array<string> & Array<number>;
export type ResultReturnType = boolean | Array<boolean>;
export type ResultType = (ans: AnswerType, res: AnswerType) => ResultReturnType;
export interface SlideInterface {
  txt: string;
  type: string;
  cont: boolean;
  exp: string;
  ref: string;
  isExercise: boolean;
  immediateConclusion: boolean;
  ans: AnswerType;
  res: AnswerType;
  o: string[];
  inst: string;
  img: string;
  numans: number;
  list: Map<string, string>;
  set: Array<SlideInterface>;
  //currently unused, awaiting removal of adocVisitor
  applyAdoc(): void;
  createHtml: CreateHtmlType;
  makeSlidesStrategy: MakeSlidesType;
  evaluateStrategy: EvaluateType;
  resultType: ResultType;
  setProperties(properties: SlideInterface): void;
  accept(visitor: AdocVisitorInterface): void;
  makeSlides(doc: Document): void;
  evaluate(): Evaluation;
  setResults(res: AnswerType): void;
  result(): ResultReturnType;
  getAnswerCount(): number;
  getSlideSet(): SlideInterface[];
  setRes(res: AnswerType): void;
  getRes(): AnswerType;
  getAns(): AnswerType;
  saveData(): void;
  decorate(doc: Document): boolean;
  conclude(doc: Document, res: AnswerType, txt: string): void;
}
