import type { SlideInterface } from '../../slideInterface';
import type {
  CreateHtmlTypeSelect as CreateHtmlSelectType,
  CreateHtmlTypeGap,
  CreateHtmlTypeImap,
  CreateHtmlTypeInfo,
  CreateHtmlTypeMa,
  CreateHtmlTypeMc,
  CreateHtmlTypeSort,
} from './createHtmlStrategy';
import { makeSlidesStrategyGap } from './makeSlides/makeSlidesStrategyGap';
import { makeSlidesStrategyImap } from './makeSlides/makeSlidesStrategyImap';
import { makeSlidesStrategyInfo } from './makeSlides/makeSlidesStrategyInfo';
import { makeSlidesStrategyMa } from './makeSlides/makeSlidesStrategyMa';
import { makeSlidesStrategyMc } from './makeSlides/makeSlidesStrategyMc';
import { makeSlidesStrategySelect } from './makeSlides/makeSlidesStrategySelect';
import { makeSlidesStrategySort } from './makeSlides/makeSlidesStrategySort';
import type { AnswerType } from './resultStrategy';
import type {
  SetWidthTypeComplex,
  SetWidthTypeSimple,
} from './setWidthsStrategy';
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
  /////////////////////////////////////////////////////////////////////////////
  //                             GAP
  /////////////////////////////////////////////////////////////////////////////
  public static readonly GAP: MakeSlidesTypeGap = function (
    txt,
    ans,
    createHtml,
    maxWidthStrategy,
    doc,
    setValues
  ) {
    makeSlidesStrategyGap(
      txt,
      ans,
      createHtml,
      maxWidthStrategy,
      doc,
      setValues
    );
  };
  /////////////////////////////////////////////////////////////////////////////
  //                             IMAP
  /////////////////////////////////////////////////////////////////////////////
  public static readonly IMAP: MakeSlidesTypeImap = function (
    txt: string,
    img: string,
    createHtml: CreateHtmlTypeImap,
    doc: Document,
    setValues: SlideInterface
  ) {
    makeSlidesStrategyImap(txt, img, createHtml, doc, setValues);
  };
  /////////////////////////////////////////////////////////////////////////////
  //                             INFO
  /////////////////////////////////////////////////////////////////////////////
  public static readonly INFO = function (
    txt: string,
    createHtml: CreateHtmlTypeInfo,
    doc: Document,
    setValues: SlideInterface
  ) {
    makeSlidesStrategyInfo(txt, createHtml, doc, setValues);
  };
  // /////////////////////////////////////////////////////////////////////////////
  // //                             MA
  // /////////////////////////////////////////////////////////////////////////////
  public static readonly MA = function (
    txt: string,
    options: string[],
    createHtml: CreateHtmlTypeMa,
    maxWidthStrategy: SetWidthTypeSimple,
    doc: Document,
    setValues: SlideInterface
  ) {
    makeSlidesStrategyMa(
      txt,
      options,
      createHtml,
      maxWidthStrategy,
      doc,
      setValues
    );
  };
  /////////////////////////////////////////////////////////////////////////////
  //                             MC
  /////////////////////////////////////////////////////////////////////////////
  public static readonly MC = function (
    txt: string,
    options: string[],
    createHtml: CreateHtmlTypeMc,
    maxWidthStrategy: SetWidthTypeSimple,
    doc: Document,
    setValues: SlideInterface
  ) {
    makeSlidesStrategyMc(
      txt,
      options,
      createHtml,
      maxWidthStrategy,
      doc,
      setValues
    );
  };
  /////////////////////////////////////////////////////////////////////////////
  //                             SELECT
  /////////////////////////////////////////////////////////////////////////////
  public static readonly SELECT = function (
    inst: string,
    txt: string,
    createHtml: CreateHtmlSelectType,
    doc: Document,
    setValues: SlideInterface
  ) {
    makeSlidesStrategySelect(inst, txt, createHtml, doc, setValues);
  };
  /////////////////////////////////////////////////////////////////////////////
  //                             SORT
  /////////////////////////////////////////////////////////////////////////////
  public static readonly SORT = function (
    txt: string,
    ans: AnswerType,
    createHtml: CreateHtmlTypeSort,
    doc: Document,
    setValues: SlideInterface
  ) {
    makeSlidesStrategySort(txt, ans, createHtml, doc, setValues);
  };
}
