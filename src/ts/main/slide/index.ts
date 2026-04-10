//slide mediator
export { Evaluation } from '../quiz/evaluation';
export { makeRow } from '../quiz/evaluate';
export { MUTE, RANDOM } from '../dataaccess/webstorage/webStorage';
export { SaveData } from '../dataaccess/saveData/saveData';
export { continueButton } from '../quiz/buttons';
export { showExplainIcon } from '../quiz/explainIcon';
export type { AdocVisitorInterface } from '../slidetype/misc/adocVisitor';
export type { CreateHtmlType } from '../slidetype/strategies/createHtmlStrategy';
export type { EvaluateType } from '../slidetype/strategies/evaluateStrategy';
export type { MakeSlidesType } from '../slidetype/strategies/makeSlidesStrategy';
export { adoc2html } from './adoc2html';
export { AudioPlayer } from './conclude/audio';
export { conclude2 } from './conclude/conclude';
export { Slide } from './slide';
export type {
  AnswerType,
  ResultReturnType,
  ResultType,
  SlideInterface,
} from './slideInterface';
