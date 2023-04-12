import { MakeSlidesTypeGap, makeSlidesStrategyGap } from '../slideType/gap/makeSlidesStrategyGap';
import { MakeSlidesTypeImap, makeSlidesStrategyImap } from '../slideType/imap/makeSlidesStrategyImap';
import { MakeSlidesTypeInfo, makeSlidesStrategyInfo } from '../slideType/info/makeSlidesStrategyInfo';
import { MakeSlidesTypeMa, makeSlidesStrategyMa } from '../slideType/ma/makeSlidesStrategyMa';
import { MakeSlidesTypeMc, makeSlidesStrategyMc } from '../slideType/mc/makeSlidesStrategyMc';
import { MakeSlidesTypeSelect, makeSlidesStrategySelect } from '../slideType/select/makeSlidesStrategySelect';
import { MakeSlidesTypeSort, makeSlidesStrategySort } from '../slideType/sort/makeSlidesStrategySort';
import { MakeSlidesTypeVocab } from '../slideType/vocab/makeSlidesStrategyVocab';
export type MakeSlidesType =
  | MakeSlidesTypeGap
  | MakeSlidesTypeImap
  | MakeSlidesTypeInfo
  | MakeSlidesTypeMa
  | MakeSlidesTypeMc
  | MakeSlidesTypeSelect
  | MakeSlidesTypeSort
  | MakeSlidesTypeVocab;
export class MakeSlidesStrategy {
  public static readonly GAP: MakeSlidesTypeGap = makeSlidesStrategyGap
  public static readonly IMAP: MakeSlidesTypeImap = makeSlidesStrategyImap;
  public static readonly INFO: MakeSlidesTypeInfo = makeSlidesStrategyInfo;
  public static readonly MA: MakeSlidesTypeMa = makeSlidesStrategyMa;
  public static readonly MC: MakeSlidesTypeMc = makeSlidesStrategyMc;
  public static readonly SELECT: MakeSlidesTypeSelect = makeSlidesStrategySelect;
  public static readonly SORT: MakeSlidesTypeSort = makeSlidesStrategySort;
}
