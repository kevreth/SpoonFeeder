//Despite the documentation, "scroll behaviour" is required, not optional,
//for basic mobile drag-and-drop ability.
export { polyfill } from 'mobile-drag-drop';
export { scrollBehaviourDragImageTranslateOverride } from 'mobile-drag-drop/scroll-behaviour';
export type { AnswerType } from '../slide/mediator';
export { AdocVisitor } from './misc/adocVisitor';
export type { AdocVisitorInterface } from './misc/adocVisitor';
export { CORRECT, INCORRECT } from './misc/markupColors';
export type { MarkTypeGap, SlideType } from './misc/slideType';
export { SetWidths } from './strategies/setWidthsStrategy/setWidthsStrategy';
