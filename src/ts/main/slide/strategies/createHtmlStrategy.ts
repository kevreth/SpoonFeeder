import type { CreateHtmlTypeGap } from '../slideType/gap/createHtmlGap'
import { createHtmlGap } from '../slideType/gap/createHtmlGap'
import type { CreateHtmlTypeImap } from '../slideType/imap/createHtmlImap'
import { createHtmlImap } from '../slideType/imap/createHtmlImap'
import type { CreateHtmlTypeInfo } from '../slideType/info/createHtmlInfo'
import { createHtmlInfo } from '../slideType/info/createHtmlInfo'
import type { CreateHtmlTypeMa } from '../slideType/ma/createHtmlMa'
import { createHtmlMa } from '../slideType/ma/createHtmlMa'
import type { CreateHtmlTypeMc } from '../slideType/mc/createHtmlMc'
import { createHtmlMc } from '../slideType/mc/createHtmlMc'
import type { CreateHtmlTypeSelect } from '../slideType/select/createHtmlSelect'
import { createHtmlSelect } from '../slideType/select/createHtmlSelect'
import type { CreateHtmlTypeSort } from '../slideType/sort/createHtmlSort'
import { createHtmlSort } from '../slideType/sort/createHtmlSort'
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
