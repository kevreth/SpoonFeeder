import { SetValues } from '../../slide';
import {CreateHtmlTypeGap, CreateHtmlTypeImap, CreateHtmlTypeInfo, CreateHtmlTypeMc, CreateHtmlTypeSelect, CreateHtmlTypeSort} from './createHtml';
import { makeSlidesStrategyGap } from './makeSlides/makeSlidesStrategyGap';
import { makeSlidesStrategyImap } from './makeSlides/makeSlidesStrategyImap';
import { makeSlidesStrategyInfo } from './makeSlides/makeSlidesStrategyInfo';
import { makeSlidesStrategyMc } from './makeSlides/makeSlidesStrategyMc';
import { makeSlidesStrategySelect } from './makeSlides/makeSlidesStrategySelect';
import { makeSlidesStrategySort } from './makeSlides/makeSlidesStrategySort';
import { makeSlidesStrategyVocab } from './makeSlides/makeSlidesStrategyVocab';
import { SetWidthTypeComplex, SetWidthTypeSimple } from './setWidths';
export type MakeSlidesGapType = (txt: string, ans: string[], createHtml: CreateHtmlTypeGap, maxWidthStrategy: SetWidthTypeComplex, doc: Document, setValues: SetValues<string[]>) => void
export type MakeSlidesImapType = (txt: string, img: string, createHtml: CreateHtmlTypeImap, doc: Document, setValues: SetValues<string>) => void;
export type MakeSlidesInfoType = (txt: string, createHtml: CreateHtmlTypeInfo, doc: Document, setValues: SetValues<string>)=>void;
export type MakeSlidesMcType = (txt: string, options: string[], isExercise: boolean, createHtml: CreateHtmlTypeMc, maxWidthStrategy: SetWidthTypeSimple, doc: Document, setValues: SetValues<string>)=>void;
export type MakeSlidesSelectType = (inst: string, ans: number[], res: string[], createHtml: CreateHtmlTypeSelect, doc: Document, setValues: SetValues<number[]>)=>void;
export type MakeSlidesSortType = (txt: string, ans: string[], createHtml: CreateHtmlTypeSort, doc: Document, setValues: SetValues<string[]>)=>void;
export type MakeSlidesVocabType = (list: Map<string, string>, res: string[], createHtml: CreateHtmlTypeMc, maxWidthStrategy: SetWidthTypeSimple, doc: Document, setValues: SetValues<string[]>)=>void;
export type MakeSlidesType = MakeSlidesGapType|MakeSlidesImapType|MakeSlidesInfoType|MakeSlidesMcType|MakeSlidesSelectType|MakeSlidesSortType|MakeSlidesVocabType;
export class MakeSlides {
  static readonly GAP:MakeSlidesGapType = function(txt, ans, createHtml, maxWidthStrategy, doc, setValues) {
    makeSlidesStrategyGap(txt, ans, createHtml, maxWidthStrategy, doc, setValues);
  }
  static readonly IMAP:MakeSlidesImapType = function(txt: string, img: string, createHtml: CreateHtmlTypeImap, doc: Document, setValues: SetValues<string>) {
    makeSlidesStrategyImap(txt, img, createHtml, doc, setValues);
  }
  static readonly INFO = function (txt: string, createHtml: CreateHtmlTypeInfo, doc: Document, setValues: SetValues<string>) {
    makeSlidesStrategyInfo(txt, createHtml, doc, setValues);
  }
  static readonly MC = function (txt: string, options: string[], isExercise: boolean, createHtml: CreateHtmlTypeMc, maxWidthStrategy: SetWidthTypeSimple, doc: Document, setValues: SetValues<string>) {
    makeSlidesStrategyMc(txt, options, isExercise, createHtml, maxWidthStrategy, doc, setValues);
  }
  static readonly SELECT = function (inst: string, ans: number[], res: string[], createHtml: CreateHtmlTypeSelect, doc: Document, setValues: SetValues<number[]>) {
    makeSlidesStrategySelect(inst, ans, res, createHtml, doc, setValues);
  }
  static readonly SORT = function (txt: string, ans: string[], createHtml: CreateHtmlTypeSort, doc: Document, setValues: SetValues<string[]>) {
    makeSlidesStrategySort(txt, ans, createHtml, doc, setValues);
  }
  static readonly VOCAB = function (list: Map<string, string>, res: string[], createHtml: CreateHtmlTypeMc, maxWidthStrategy: SetWidthTypeSimple, doc: Document, setValues: SetValues<string[]>) {
    makeSlidesStrategyVocab(list, res, createHtml, maxWidthStrategy, doc, setValues);
  }
}
