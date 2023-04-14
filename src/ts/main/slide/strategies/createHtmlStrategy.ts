import { createHtmlSort, CreateHtmlTypeSort } from '../slideType/sort/createHtmlSort';
import { createHtmlSelect, CreateHtmlTypeSelect } from '../slideType/select/createHtmlSelect';
import { createHtmlMc, CreateHtmlTypeMc } from '../slideType/mc/createHtmlMc';
import { createHtmlImap, CreateHtmlTypeImap } from '../slideType/imap/createHtmlImap';
import { createHtmlMa, CreateHtmlTypeMa } from '../slideType/ma/createHtmlMa';
import { createHtmlGap, CreateHtmlTypeGap } from '../slideType/gap/createHtmlGap';
import { createHtmlInfo, CreateHtmlTypeInfo } from '../slideType/info/createHtmlInfo';
export type { CreateHtmlTypeGap };
export type { CreateHtmlTypeInfo };
export type { CreateHtmlTypeImap };
export type { CreateHtmlTypeMa };
export type { CreateHtmlTypeMc };
export type { CreateHtmlTypeSelect };
export type { CreateHtmlTypeSort };
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

