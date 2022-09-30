import { Evaluation } from './evaluate';
import { AnswerType, ResultReturnType } from './slide/strategies/result';

export interface SlideInterface {
  txt: AnswerType;
  type: string;
  isExercise: boolean;
  pageTemplate: string;
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
