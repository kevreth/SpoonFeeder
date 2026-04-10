import { createHtmlGap } from '../types/gap/createHtmlGap';
import type { CreateHtmlTypeGap } from '../types/gap/createHtmlGap';
import { createHtmlImap } from '../types/imap/createHtmlImap';
import type { CreateHtmlTypeImap } from '../types/imap/createHtmlImap';
import { createHtmlInfo } from '../types/info/createHtmlInfo';
import type { CreateHtmlTypeInfo } from '../types/info/createHtmlInfo';
import { createHtmlMa } from '../types/ma/createHtmlMa';
import type { CreateHtmlTypeMa } from '../types/ma/createHtmlMa';
import { createHtmlMc } from '../types/mc/createHtmlMc';
import type { CreateHtmlTypeMc } from '../types/mc/createHtmlMc';
import { createHtmlSelect } from '../types/select/createHtmlSelect';
import type { CreateHtmlTypeSelect } from '../types/select/createHtmlSelect';
import { createHtmlSort } from '../types/sort/createHtmlSort';
import type { CreateHtmlTypeSort } from '../types/sort/createHtmlSort';
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
