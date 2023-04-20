//slide mediator
export {
  Evaluation,
  MUTE,
  RANDOM,
  SaveData,
  adoc2html,
  append,
  continueButton,
  empty,
  isEqual,
  makeRow,
  removeListener,
  showExplainIcon,
  shuffle,
} from '../quiz/mediator';
export type {
  AdocVisitorInterface,
  CreateHtmlType,
  EvaluateType,
  MakeSlidesType,
} from '../slidetype/mediator';
export { AudioPlayer } from './conclude/audio';
export { conclude2 } from './conclude/conclude';
export { Slide } from './slide';
export type {
  AnswerType,
  ResultReturnType,
  ResultType,
  SlideInterface,
} from './slideInterface';
