//quiz mediator
export {
  COURSE_NAME,
  Json,
  MUTE,
  PREFIX_COURSE_FILE,
  RANDOM,
  SaveData, TRANSITION, adoc2html,
  clearSessionStorage,
  loadCourse,
  process
} from '../dataaccess/mediator';
export type {
  Course,
  Division,
  DivisionProcessor
} from '../dataaccess/mediator';
export {
  difference,
  intersection,
  isEqual,
  last,
  marked,
  shuffle
} from '../mediator';
export { explanation } from '../slide/explanation';
export type { AnswerType, SlideInterface } from '../slide/mediator';
export { INFO, initSlide } from '../slidetype/mediator';
export { AdocVisitor } from '../slidetype/misc/adocVisitor';
export type { AdocVisitorInterface } from '../slidetype/misc/adocVisitor';
export {
  continueButton,
  doneButton,
  makeButton,
  startOverButton
} from './buttons';
export { Evaluation, evaluate, makeRow, percentCorrect } from './evaluate';
export { hideExplainIcon, showExplainIcon } from './explainIcon';
export { switchCourse } from './quiz';
export { Score } from './score';
export { fillMatchingSlide, showSlides } from './slideDispatcher';
export { dispatch2 } from './stateActionDispatcher';
export type { StateActions } from './stateActionDispatcher';
export {
  getChildIds,
  remove,
  removeListener
} from './utilities';

