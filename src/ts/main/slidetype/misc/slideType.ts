import type { SlideInterface } from '../../slide/mediator';
import type { AnswerType } from '../strategies/resultStrategy';
import { AdocVisitorInterface } from './adocVisitor';
export type MarkTypeGap = (corrArr: boolean[], doc: Document) => void;
export type MarkTypeImap = (
  isCorrect: boolean,
  id: string,
  doc: Document
) => void;
export type MarkTypeMa = (
  isKey: boolean,
  selected: boolean,
  btn: HTMLElement
) => void;
export type MarkTypeMc = (
  isCorrect: boolean,
  responseButton: HTMLElement,
  answerButton: HTMLElement
) => void;
export type MarkTypeSelect = (
  ans: AnswerType,
  res: AnswerType,
  doc: Document
) => void;
export type MarkTypeSort = (isCorrect: boolean, doc: Document) => void;
export type MarkType =
  | MarkTypeGap
  | MarkTypeImap
  | MarkTypeMa
  | MarkTypeMc
  | MarkTypeSelect
  | MarkTypeSort;
export interface SlideType {
  setProperties(props: SlideInterface): void;
  accept(visitor: AdocVisitorInterface): void;
  makeSlides(doc: Document): void;
  decorate(doc: Document): boolean;
  mark: MarkType;
}
