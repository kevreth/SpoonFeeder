import type { Evaluation } from './evaluate';
import type { CreateHtmlTypeIntersection } from './slide/strategies/createHtml';
import type { EvaluateType } from './slide/strategies/evaluate';
import type { MakeSlidesType } from './slide/strategies/makeSlides';
import type {
  AnswerType,
  ResultReturnType,
  ResultType,
} from './slide/strategies/result';

export interface SlideInterface {
  txt: AnswerType;
  type: string;
  isExercise: boolean;
  pageTemplate: string;
  createHtml: CreateHtmlTypeIntersection;
  makeSlidesStrategy: MakeSlidesType;
  evaluateStrategy: EvaluateType;
  resultType: ResultType;
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