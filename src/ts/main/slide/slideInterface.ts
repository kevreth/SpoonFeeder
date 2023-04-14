import type { AdocVisitorInterface } from '../datalayer/mediator'
import type { Evaluation } from '../quiz/evaluate'
import type { CreateHtmlType } from './strategies/createHtmlStrategy'
import type { EvaluateType } from './strategies/evaluateStrategy'
import type { MakeSlidesType } from './strategies/makeSlidesStrategy'
import type {
  AnswerType,
  ResultReturnType,
  ResultType,
} from './strategies/resultStrategy'
export interface SlideInterfaceProperties {
  txt: string;
  type: string;
  ans: AnswerType;
  cont: boolean;
  exp?: string;
  ref?: string;
  res?: AnswerType;
  o?: string[];
  numans?: number;
  list?: ArrayLike<string> | { [ s: string ]: string }
  isExercise: boolean;
  immediateConclusion: boolean;
}
export interface SlideInterface extends SlideInterfaceProperties {
  createHtml: CreateHtmlType;
  makeSlidesStrategy: MakeSlidesType;
  evaluateStrategy: EvaluateType;
  resultType: ResultType;
  //Transform human-created YML into computer-friendly JSON
  //Run before quiz starts
  processJson(json: SlideInterface): void;
  accept(visitor: AdocVisitorInterface): void;
  //Create slide HTML during quiz
  makeSlides(doc: Document): void;
  //Evaluate user responses at the end of quiz
  //evaluation during quiz is NOT here
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
