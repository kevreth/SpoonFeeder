//slide mediator
export { Evaluation } from '../quiz/evaluation';
export { makeRow } from '../quiz/evaluate';
export { MUTE, RANDOM } from '../dataaccess/webstorage/webStorage';
export { SaveData } from '../dataaccess/saveData/saveData';
export type { AdocVisitorInterface } from '../slidetype/misc/adocVisitor';
export type { EvaluateType } from '../slidetype/strategies/evaluateStrategy';
export { adoc2html } from './adoc2html';
export { AudioPlayer } from './conclude/audio';
export { Slide } from './slide';
export type {
  AnswerType,
  ResultReturnType,
  ResultType,
  SlideInterface,
} from './slideInterface';
