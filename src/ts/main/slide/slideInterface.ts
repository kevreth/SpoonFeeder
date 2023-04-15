import type { AdocVisitorInterface } from '../datalayer/mediator';
import type { Evaluation } from '../quiz/evaluate';
import type {
  AnswerType, CreateHtmlType, EvaluateType, MakeSlidesType, ResultReturnType,
  ResultType
} from '../slidetype/mediator';
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
}
