import { SetValues } from '../../slide';
import {GapType, ImapType, InfoType, McType, SelectType, SortType} from './createHtml';
import { makeSlidesStrategyGap } from './makeSlides/makeSlidesStrategyGap';
import { makeSlidesStrategyImap } from './makeSlides/makeSlidesStrategyImap';
import { makeSlidesStrategyInfo } from './makeSlides/makeSlidesStrategyInfo';
import { makeSlidesStrategyMc } from './makeSlides/makeSlidesStrategyMc';
import { makeSlidesStrategySelect } from './makeSlides/makeSlidesStrategySelect';
import { makeSlidesStrategySort } from './makeSlides/makeSlidesStrategySort';
import { makeSlidesStrategyVocab } from './makeSlides/makeSlidesStrategyVocab';
import { AnswerType } from './result';
import { SetWidthTypeComplex, SetWidthTypeSimple } from './setWidths';
export type MakeSlidesGapType = (txt: string, ans: string[], createHtml: GapType, maxWidthStrategy: SetWidthTypeComplex, doc: Document, setValues: SetValues<string[]>) => void
export class MakeSlides {
  static readonly GAP:MakeSlidesGapType = function(txt, ans, createHtml, maxWidthStrategy, doc, setValues) {
    makeSlidesStrategyGap(txt, ans, createHtml, maxWidthStrategy, doc, setValues);
  }
  static readonly IMAP = function(txt: string, img: string, createHtml: ImapType, doc: Document, setValues: SetValues<string>) {
    makeSlidesStrategyImap((txt as string), img, createHtml, doc, setValues);
  }
  static readonly INFO = function (txt: string, createHtml: InfoType, doc: Document, setValues: SetValues<string>) {
    makeSlidesStrategyInfo(txt, createHtml, doc, setValues);
  }
  static readonly MC = function (txt: string, options: string[], isExercise: boolean, createHtml: McType, maxWidthStrategy: SetWidthTypeSimple, doc: Document, setValues: SetValues<string>) {
    makeSlidesStrategyMc((txt as string), options, isExercise, createHtml, maxWidthStrategy, doc, setValues);
  }
  static readonly SELECT = function (inst: string, ans: number[], res: string[], createHtml: SelectType, doc: Document, setValues: SetValues<number[]>) {
    makeSlidesStrategySelect(inst, ans, res, createHtml, doc, setValues);
  }
  static readonly SORT = function (txt: AnswerType, ans: string[], createHtml: SortType, doc: Document, setValues: SetValues<string[]>) {
    makeSlidesStrategySort(txt, ans, createHtml, doc, setValues);
  }
  static readonly VOCAB = function (list: Map<string, string>, res: string[], createHtml: McType, maxWidthStrategy: SetWidthTypeSimple, doc: Document, setValues: SetValues<string[]>) {
    makeSlidesStrategyVocab(list, res, createHtml, maxWidthStrategy, doc, setValues);
  }
}
