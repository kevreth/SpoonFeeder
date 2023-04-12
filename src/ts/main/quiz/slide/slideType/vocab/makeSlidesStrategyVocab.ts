import { SlideInterface } from '../../../slideInterface';
import { CreateHtmlTypeMc } from '../../strategies/createHtmlStrategy';
import { AnswerType } from '../../strategies/resultStrategy';
import { SetWidthTypeSimple } from '../../strategies/setWidthsStrategy/setWidthsStrategy';

export type MakeSlidesTypeVocab = (
  list: Map<string, string>,
  res: AnswerType,
  createHtml: CreateHtmlTypeMc,
  maxWidthStrategy: SetWidthTypeSimple,
  doc: Document,
  setValues: SlideInterface,
  set: SlideInterface[]
) => void;
