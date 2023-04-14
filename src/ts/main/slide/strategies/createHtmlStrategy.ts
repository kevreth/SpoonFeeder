import {
  createHtmlGap,
  CreateHtmlTypeGap,
} from '../slideType/gap/createHtmlGap';
import {
  createHtmlImap,
  CreateHtmlTypeImap,
} from '../slideType/imap/createHtmlImap';
import {
  createHtmlInfo,
  CreateHtmlTypeInfo,
} from '../slideType/info/createHtmlInfo';
import { createHtmlMa, CreateHtmlTypeMa } from '../slideType/ma/createHtmlMa';
import { createHtmlMc, CreateHtmlTypeMc } from '../slideType/mc/createHtmlMc';
import {
  createHtmlSelect,
  CreateHtmlTypeSelect,
} from '../slideType/select/createHtmlSelect';
import {
  createHtmlSort,
  CreateHtmlTypeSort,
} from '../slideType/sort/createHtmlSort';
export type CreateHtmlType = CreateHtmlTypeInfo &
  CreateHtmlTypeGap &
  CreateHtmlTypeImap &
  CreateHtmlTypeMa &
  CreateHtmlTypeMc &
  CreateHtmlTypeSelect &
  CreateHtmlTypeSort;
export class CreateHtml {
  static readonly INFO: CreateHtmlTypeInfo = createHtmlInfo;
  static readonly GAP: CreateHtmlTypeGap = createHtmlGap;
  static readonly IMAP: CreateHtmlTypeImap = createHtmlImap;
  static readonly MA: CreateHtmlTypeMa = createHtmlMa;
  static readonly MC: CreateHtmlTypeMc = createHtmlMc;
  static readonly SELECT: CreateHtmlTypeSelect = createHtmlSelect;
  static readonly SORT: CreateHtmlTypeSort = createHtmlSort;
}
