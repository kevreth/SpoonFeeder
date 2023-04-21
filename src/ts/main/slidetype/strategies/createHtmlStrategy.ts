import type {
  CreateHtmlTypeGap,
  CreateHtmlTypeImap,
  CreateHtmlTypeInfo,
  CreateHtmlTypeMa,
  CreateHtmlTypeMc,
  CreateHtmlTypeSelect,
  CreateHtmlTypeSort,
} from '../mediator';
import {
  createHtmlGap,
  createHtmlImap,
  createHtmlInfo,
  createHtmlMa,
  createHtmlMc,
  createHtmlSelect,
  createHtmlSort,
} from '../mediator';
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
