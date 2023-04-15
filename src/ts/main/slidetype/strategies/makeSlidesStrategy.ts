import type { MakeSlidesTypeGap } from '../types/gap/makeSlidesStrategyGap';
import { makeSlidesStrategyGap } from '../types/gap/makeSlidesStrategyGap';
import type { MakeSlidesTypeImap } from '../types/imap/makeSlidesStrategyImap';
import { makeSlidesStrategyImap } from '../types/imap/makeSlidesStrategyImap';
import type { MakeSlidesTypeInfo } from '../types/info/makeSlidesStrategyInfo';
import { makeSlidesStrategyInfo } from '../types/info/makeSlidesStrategyInfo';
import type { MakeSlidesTypeMa } from '../types/ma/makeSlidesStrategyMa';
import { makeSlidesStrategyMa } from '../types/ma/makeSlidesStrategyMa';
import type { MakeSlidesTypeMc } from '../types/mc/makeSlidesStrategyMc';
import { makeSlidesStrategyMc } from '../types/mc/makeSlidesStrategyMc';
import type { MakeSlidesTypeSelect } from '../types/select/makeSlidesStrategySelect';
import { makeSlidesStrategySelect } from '../types/select/makeSlidesStrategySelect';
import type { MakeSlidesTypeSort } from '../types/sort/makeSlidesStrategySort';
import { makeSlidesStrategySort } from '../types/sort/makeSlidesStrategySort';
import type { MakeSlidesTypeVocab } from '../types/vocab/makeSlidesStrategyVocab';
export type MakeSlidesType = MakeSlidesTypeGap &
  MakeSlidesTypeImap &
  MakeSlidesTypeInfo &
  MakeSlidesTypeMa &
  MakeSlidesTypeMc &
  MakeSlidesTypeSelect &
  MakeSlidesTypeSort &
  MakeSlidesTypeVocab;
export class MakeSlidesStrategy {
  public static readonly GAP: MakeSlidesTypeGap = makeSlidesStrategyGap;
  public static readonly IMAP: MakeSlidesTypeImap = makeSlidesStrategyImap;
  public static readonly INFO: MakeSlidesTypeInfo = makeSlidesStrategyInfo;
  public static readonly MA: MakeSlidesTypeMa = makeSlidesStrategyMa;
  public static readonly MC: MakeSlidesTypeMc = makeSlidesStrategyMc;
  public static readonly SELECT: MakeSlidesTypeSelect =
    makeSlidesStrategySelect;
  public static readonly SORT: MakeSlidesTypeSort = makeSlidesStrategySort;
}
