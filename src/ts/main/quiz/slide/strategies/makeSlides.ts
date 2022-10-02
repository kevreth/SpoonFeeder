import type { SetValues } from '../setValues';
import type {
  CreateHtmlTypeGap,
  CreateHtmlTypeImap,
  CreateHtmlTypeInfo,
  CreateHtmlTypeMc,
  CreateHtmlTypeSelect as CreateHtmlSelectType,
  CreateHtmlTypeSort,
} from './createHtml';
import { makeSlidesStrategyGap } from './makeSlides/makeSlidesStrategyGap';
import { makeSlidesStrategyImap } from './makeSlides/makeSlidesStrategyImap';
import { makeSlidesStrategyInfo } from './makeSlides/makeSlidesStrategyInfo';
import { makeSlidesStrategyMc } from './makeSlides/makeSlidesStrategyMc';
import { makeSlidesStrategySelect } from './makeSlides/makeSlidesStrategySelect';
import { makeSlidesStrategySort } from './makeSlides/makeSlidesStrategySort';
import { makeSlidesStrategyVocab } from './makeSlides/makeSlidesStrategyVocab';
import type { SetWidthTypeComplex, SetWidthTypeSimple } from './setWidths';
export type MakeSlidesTypeGap = (
  txt: string,
  ans: string[],
  createHtml: CreateHtmlTypeGap,
  maxWidthStrategy: SetWidthTypeComplex,
  doc: Document,
  setValues: SetValues<string[]>
) => void;
export type MakeSlidesTypeImap = (
  txt: string,
  img: string,
  createHtml: CreateHtmlTypeImap,
  doc: Document,
  setValues: SetValues<string>
) => void;
export type MakeSlidesTypeInfo = (
  txt: string,
  createHtml: CreateHtmlTypeInfo,
  doc: Document,
  setValues: SetValues<string>
) => void;
export type MakeSlidesTypeMc = (
  txt: string,
  options: string[],
  isExercise: boolean,
  createHtml: CreateHtmlTypeMc,
  maxWidthStrategy: SetWidthTypeSimple,
  doc: Document,
  setValues: SetValues<string>
) => void;
export type MakeSlidesTypeSelect = (
  inst: string,
  ans: number[],
  res: string[],
  createHtml: CreateHtmlSelectType,
  doc: Document,
  setValues: SetValues<number[]>
) => void;
export type MakeSlidesTypeSort = (
  txt: string,
  ans: string[],
  createHtml: CreateHtmlTypeSort,
  doc: Document,
  setValues: SetValues<string[]>
) => void;
export type MakeSlidesTypeVocab = (
  list: Map<string, string>,
  res: string[],
  createHtml: CreateHtmlTypeMc,
  maxWidthStrategy: SetWidthTypeSimple,
  doc: Document,
  setValues: SetValues<string[]>
) => void;
export type MakeSlidesType =
  | MakeSlidesTypeGap
  | MakeSlidesTypeImap
  | MakeSlidesTypeInfo
  | MakeSlidesTypeMc
  | MakeSlidesTypeSelect
  | MakeSlidesTypeSort
  | MakeSlidesTypeVocab;
export class MakeSlides {
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
  public static readonly IMAP: MakeSlidesTypeImap = function (
    txt: string,
    img: string,
    createHtml: CreateHtmlTypeImap,
    doc: Document,
    setValues: SetValues<string>
  ) {
    makeSlidesStrategyImap(txt, img, createHtml, doc, setValues);
  };
  public static readonly INFO = function (
    txt: string,
    createHtml: CreateHtmlTypeInfo,
    doc: Document,
    setValues: SetValues<string>
  ) {
    makeSlidesStrategyInfo(txt, createHtml, doc, setValues);
  };
  public static readonly MC = function (
    txt: string,
    options: string[],
    isExercise: boolean,
    createHtml: CreateHtmlTypeMc,
    maxWidthStrategy: SetWidthTypeSimple,
    doc: Document,
    setValues: SetValues<string>
  ) {
    makeSlidesStrategyMc(
      txt,
      options,
      isExercise,
      createHtml,
      maxWidthStrategy,
      doc,
      setValues
    );
  };
  public static readonly SELECT = function (
    inst: string,
    ans: number[],
    res: string[],
    createHtml: CreateHtmlSelectType,
    doc: Document,
    setValues: SetValues<number[]>
  ) {
    makeSlidesStrategySelect(inst, ans, res, createHtml, doc, setValues);
  };
  public static readonly SORT = function (
    txt: string,
    ans: string[],
    createHtml: CreateHtmlTypeSort,
    doc: Document,
    setValues: SetValues<string[]>
  ) {
    makeSlidesStrategySort(txt, ans, createHtml, doc, setValues);
  };
  public static readonly VOCAB = function (
    list: Map<string, string>,
    res: string[],
    createHtml: CreateHtmlTypeMc,
    maxWidthStrategy: SetWidthTypeSimple,
    doc: Document,
    setValues: SetValues<string[]>
  ) {
    makeSlidesStrategyVocab(
      list,
      res,
      createHtml,
      maxWidthStrategy,
      doc,
      setValues
    );
  };
}
