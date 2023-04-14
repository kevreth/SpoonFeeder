import type { MakeSlidesTypeGap } from '../slideType/gap/makeSlidesStrategyGap';
import { makeSlidesStrategyGap } from '../slideType/gap/makeSlidesStrategyGap';
import type { MakeSlidesTypeImap } from '../slideType/imap/makeSlidesStrategyImap';
import { makeSlidesStrategyImap } from '../slideType/imap/makeSlidesStrategyImap';
import type { MakeSlidesTypeInfo } from '../slideType/info/makeSlidesStrategyInfo';
import { makeSlidesStrategyInfo } from '../slideType/info/makeSlidesStrategyInfo';
import type { MakeSlidesTypeMa } from '../slideType/ma/makeSlidesStrategyMa';
import { makeSlidesStrategyMa } from '../slideType/ma/makeSlidesStrategyMa';
import type { MakeSlidesTypeMc } from '../slideType/mc/makeSlidesStrategyMc';
import { makeSlidesStrategyMc } from '../slideType/mc/makeSlidesStrategyMc';
import type { MakeSlidesTypeSelect } from '../slideType/select/makeSlidesStrategySelect';
import { makeSlidesStrategySelect } from '../slideType/select/makeSlidesStrategySelect';
import type { MakeSlidesTypeSort } from '../slideType/sort/makeSlidesStrategySort';
import { makeSlidesStrategySort } from '../slideType/sort/makeSlidesStrategySort';
import type { MakeSlidesTypeVocab } from '../slideType/vocab/makeSlidesStrategyVocab';
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
