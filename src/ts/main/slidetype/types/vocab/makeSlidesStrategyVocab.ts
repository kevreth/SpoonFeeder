import type { SlideInterface } from '../../../slide/mediator';
import type { AnswerType } from '../../strategies/resultStrategy';
import type { SetWidthTypeSimple } from '../../strategies/setWidthsStrategy/setWidthsStrategy';
import type { CreateHtmlTypeMc } from '../mc/createHtmlMc';

export type MakeSlidesTypeVocab = (
  list: Map<string, string>,
  res: AnswerType,
  createHtml: CreateHtmlTypeMc,
  maxWidthStrategy: SetWidthTypeSimple,
  doc: Document,
  slide: SlideInterface,
  set: SlideInterface[]
) => void;
