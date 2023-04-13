import type { AnswerType } from './resultStrategy';
import { createHtmlSort } from '../slideType/sort/createHtmlSort';
import { createHtmlSelect } from '../slideType/select/createHtmlSelect';
import { createHtmlMc } from '../slideType/mc/createHtmlMc';
import { createHtmlImap } from '../slideType/imap/createHtmlImap';
import { createHtmlMa } from '../slideType/ma/createHtmlMa';
import { createHtmlGap } from '../slideType/gap/createHtmlGap';
import { createHtmlInfo } from '../slideType/info/createHtmlInfo';
export type CreateHtmlTypeGap = (
  remaining: string,
  fills: string,
  gaps: string
) => string;
export type CreateHtmlTypeInfo = (txt: string) => string;
export type CreateHtmlTypeImap = (inst: string, img: string) => string;
export type CreateHtmlTypeMa = (question: string, options: string[]) => string;
export type CreateHtmlTypeMc = (question: string, options: string[]) => string;
export type CreateHtmlTypeSelect = (
  instructions: string,
  txt: string[]
) => string;
export type CreateHtmlTypeSort = (inst: string, ans: AnswerType) => string;
export type CreateHtmlTypeUnion =
  | CreateHtmlTypeGap
  | CreateHtmlTypeImap
  | CreateHtmlTypeMa
  | CreateHtmlTypeMc
  | CreateHtmlTypeSelect
  | CreateHtmlTypeSort;
export type CreateHtmlTypeIntersection =
  CreateHtmlTypeGap &
  CreateHtmlTypeImap &
  CreateHtmlTypeMa &
  CreateHtmlTypeMc &
  CreateHtmlTypeSelect &
  CreateHtmlTypeSort;
export interface CreateHtmlI {
  createHtml: CreateHtmlTypeUnion;
}
export class CreateHtml {
    static readonly INFO: CreateHtmlTypeInfo = createHtmlInfo;
    static readonly GAP: CreateHtmlTypeGap = createHtmlGap;
    static readonly IMAP: CreateHtmlTypeImap = createHtmlImap;
    static readonly MA: CreateHtmlTypeMa = createHtmlMa;
    static readonly MC: CreateHtmlTypeMc = createHtmlMc;
    static readonly SELECT: CreateHtmlTypeSelect = createHtmlSelect;
    static readonly SORT: CreateHtmlTypeSort = createHtmlSort;
}

