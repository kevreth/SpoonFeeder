import type { SlideInterface } from '../../../slideInterface';
import type {
  CreateHtmlTypeSelect as CreateHtmlSelectType,
  CreateHtmlTypeGap,
  CreateHtmlTypeImap,
  CreateHtmlTypeInfo,
  CreateHtmlTypeMa,
  CreateHtmlTypeMc,
  CreateHtmlTypeSort,
} from '../createHtmlStrategy';
import { makeSlidesStrategyGap } from './makeSlidesStrategyGap';
import { makeSlidesStrategyImap } from './makeSlidesStrategyImap';
import { makeSlidesStrategyInfo } from './makeSlidesStrategyInfo';
import { makeSlidesStrategyMa } from './makeSlidesStrategyMa';
import { makeSlidesStrategyMc } from './makeSlidesStrategyMc';
import { makeSlidesStrategySelect } from './makeSlidesStrategySelect';
import { makeSlidesStrategySort } from './makeSlidesStrategySort';
import type { AnswerType } from '../resultStrategy';
import type {
  SetWidthTypeComplex,
  SetWidthTypeSimple,
} from '../setWidthsStrategy';
/////////////////////////////////////////////////////////////////////////////
//                             TYPES
/////////////////////////////////////////////////////////////////////////////
export type MakeSlidesTypeGap = (
  txt: string,
  ans: AnswerType,
  createHtml: CreateHtmlTypeGap,
  maxWidthStrategy: SetWidthTypeComplex,
  doc: Document,
  setValues: SlideInterface
) => void;
export type MakeSlidesTypeImap = (
  txt: string,
  img: string,
  createHtml: CreateHtmlTypeImap,
  doc: Document,
  setValues: SlideInterface
) => void;
export type MakeSlidesTypeInfo = (
  txt: string,
  createHtml: CreateHtmlTypeInfo,
  doc: Document,
  setValues: SlideInterface
) => void;
export type MakeSlidesTypeMa = (
  txt: string,
  options: string[],
  createHtml: CreateHtmlTypeMa,
  maxWidthStrategy: SetWidthTypeSimple,
  doc: Document,
  setValues: SlideInterface
) => void;
export type MakeSlidesTypeMc = (
  txt: string,
  options: string[],
  createHtml: CreateHtmlTypeMc,
  maxWidthStrategy: SetWidthTypeSimple,
  doc: Document,
  setValues: SlideInterface
) => void;
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
