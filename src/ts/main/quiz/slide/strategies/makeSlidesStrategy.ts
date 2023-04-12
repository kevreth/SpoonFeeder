import type { SlideInterface } from '../../slideInterface';
import type {
  CreateHtmlTypeSelect as CreateHtmlSelectType,
  CreateHtmlTypeMc,
  CreateHtmlTypeSort,
} from './createHtmlStrategy';
import { makeSlidesStrategyGap } from '../slideType/gap/makeSlidesStrategyGap';
import { MakeSlidesTypeImap, makeSlidesStrategyImap } from '../slideType/imap/makeSlidesStrategyImap';
import { MakeSlidesTypeInfo, makeSlidesStrategyInfo } from '../slideType/info/makeSlidesStrategyInfo';
import { MakeSlidesTypeMa, makeSlidesStrategyMa } from '../slideType/ma/makeSlidesStrategyMa';
import { MakeSlidesTypeMc, makeSlidesStrategyMc } from '../slideType/mc/makeSlidesStrategyMc';
import { makeSlidesStrategySelect } from '../slideType/select/makeSlidesStrategySelect';
import { makeSlidesStrategySort } from '../slideType/sort/makeSlidesStrategySort';
import type { AnswerType } from './resultStrategy';
import type {
  SetWidthTypeSimple,
} from './setWidthsStrategy/setWidthsStrategy';
import { MakeSlidesTypeGap } from '../slideType/gap/slideTypeGap';
/////////////////////////////////////////////////////////////////////////////
//                             TYPES
/////////////////////////////////////////////////////////////////////////////

export type MakeSlidesTypeSelect = (
  inst: string,
  txt: string,
  createHtml: CreateHtmlSelectType,
  doc: Document,
  setValues: SlideInterface
) => void;
export type MakeSlidesTypeSort = (
  txt: string,
  ans: AnswerType,
  createHtml: CreateHtmlTypeSort,
  doc: Document,
  setValues: SlideInterface
) => void;
export type MakeSlidesTypeVocab = (
  list: Map<string, string>,
  res: AnswerType,
  createHtml: CreateHtmlTypeMc,
  maxWidthStrategy: SetWidthTypeSimple,
  doc: Document,
  setValues: SlideInterface,
  set: SlideInterface[]
) => void;
export type MakeSlidesType =
  | MakeSlidesTypeGap
  | MakeSlidesTypeImap
  | MakeSlidesTypeInfo
  | MakeSlidesTypeMa
  | MakeSlidesTypeMc
  | MakeSlidesTypeSelect
  | MakeSlidesTypeSort
  | MakeSlidesTypeVocab;
export class MakeSlidesStrategy {
  public static readonly GAP: MakeSlidesTypeGap = makeSlidesStrategyGap
  public static readonly IMAP: MakeSlidesTypeImap = makeSlidesStrategyImap;
  public static readonly INFO: MakeSlidesTypeInfo = makeSlidesStrategyInfo;
  public static readonly MA: MakeSlidesTypeMa = makeSlidesStrategyMa;
  public static readonly MC: MakeSlidesTypeMc = makeSlidesStrategyMc;
  public static readonly SELECT: MakeSlidesTypeSelect = makeSlidesStrategySelect;
  public static readonly SORT: MakeSlidesTypeSort = makeSlidesStrategySort;
}
