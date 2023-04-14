import { SlideInterface } from '../../slideInterface'
import type { AnswerType } from '../../strategies/resultStrategy'
import { SetWidthTypeSimple } from '../../strategies/setWidthsStrategy/setWidthsStrategy'
import { CreateHtmlTypeMc } from '../mc/createHtmlMc'

export type MakeSlidesTypeVocab = (
  list: Map<string, string>,
  res: AnswerType,
  createHtml: CreateHtmlTypeMc,
  maxWidthStrategy: SetWidthTypeSimple,
  doc: Document,
  setValues: SlideInterface,
  set: SlideInterface[]
) => void;
