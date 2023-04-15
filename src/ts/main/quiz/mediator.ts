export { explanation } from '../slide/explanation';
export type { AnswerType, SlideInterface } from '../slide/mediator';
export { INFO, initSlide } from '../slidetype/mediator';
export { AdocVisitor } from '../slidetype/misc/adocVisitor';
export type { AdocVisitorInterface } from '../slidetype/misc/adocVisitor';
export { fillMatchingSlide, showSlides } from './slideDispatcher';
export { dispatch2 } from './stateActionDispatcher';
export type { StateActions } from './stateActionDispatcher';
export {
  difference,
  extend,
  getChildIds,
  intersection,
  isEqual,
  last,
  remove,
  removeListener,
  shuffle,
} from './utilities';
