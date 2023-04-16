//slidetype mediator
export { append, empty } from '../quiz/mediator';
export { Slide } from '../slide/slide';
export type {
  AnswerType,
  ResultReturnType,
  ResultType
} from '../slide/slideInterface';
export { AdocVisitor } from './misc/adocVisitor';
export type { AdocVisitorInterface } from './misc/adocVisitor';
export { initSlide } from './misc/slideFactory';
export type { CreateHtmlType } from './strategies/createHtmlStrategy';
export type { EvaluateType } from './strategies/evaluateStrategy';
export type { MakeSlidesType } from './strategies/makeSlidesStrategy';
export { INFO } from './types/info/factoryInfo';
