//quiz mediator
export { adoc2html } from '../datalayer/courseData/adoc2html';
export { explanation } from '../slide/explanation';
export type { AnswerType, SlideInterface } from '../slide/mediator';
export { INFO, initSlide } from '../slidetype/mediator';
export { AdocVisitor } from '../slidetype/misc/adocVisitor';
export type { AdocVisitorInterface } from '../slidetype/misc/adocVisitor';
export { doneButton, makeButton, showButton, showExplainIcon } from './buttons';
export { Evaluation, makeRow } from './evaluate';
export { fillMatchingSlide, showSlides } from './slideDispatcher';
export { dispatch2 } from './stateActionDispatcher';
export type { StateActions } from './stateActionDispatcher';
export {
  append,
  difference,
  empty,
  extend,
  getChildIds,
  intersection,
  isEqual,
  last,
  remove,
  removeListener,
  shuffle,
} from './utilities';
