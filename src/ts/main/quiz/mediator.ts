//quiz mediator
export { RANDOM, adoc2html } from '../dataaccess/mediator';
export { difference, intersection, isEqual, last, shuffle } from '../mediator';
export { explanation } from '../slide/explanation';
export type { AnswerType, SlideInterface } from '../slide/mediator';
export { INFO, initSlide } from '../slidetype/mediator';
export { AdocVisitor } from '../slidetype/misc/adocVisitor';
export type { AdocVisitorInterface } from '../slidetype/misc/adocVisitor';
export { continueButton, doneButton, makeButton } from './buttons';
export { Evaluation, makeRow } from './evaluate';
export { showExplainIcon } from './explainIcon';
export { fillMatchingSlide, showSlides } from './slideDispatcher';
export { dispatch2 } from './stateActionDispatcher';
export type { StateActions } from './stateActionDispatcher';
export {
  append,
  empty,
  extend,
  getChildIds,
  remove,
  removeListener,
} from './utilities';
