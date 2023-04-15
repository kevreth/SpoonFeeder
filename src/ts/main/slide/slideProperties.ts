import { AnswerType } from './strategies/resultStrategy';

export interface SlideProperties {
  txt: string;
  type: string;
  cont: boolean;
  immediateConclusion: boolean;
  isExercise: boolean;
}
export interface SlidePropertiesResponsive extends SlideProperties {
  ans: AnswerType;
  res?: AnswerType;
  exp?: string;
  ref?: string;
}
export type SlidePropertiesGap = SlidePropertiesResponsive;
export interface SlidePropertiesImap extends SlidePropertiesResponsive {
  img: string;
}
export type SlidePropertiesInfo = SlideProperties;
export interface SlidePropertiesMc extends SlidePropertiesResponsive {
  o: string[];
}
export interface SlidePropertiesMa extends SlidePropertiesMc {
  numans: number;
}
export interface SlidePropertiesSelect extends SlidePropertiesResponsive {
  inst: string;
}
export type SlidePropertiesSort = SlidePropertiesResponsive;
export interface SlidePropertiesVocab extends SlidePropertiesResponsive {
  list: Map<string, string>;
}
export type SlidePropertiesType =
  | SlidePropertiesGap
  | SlidePropertiesImap
  | SlidePropertiesInfo
  | SlidePropertiesMc
  | SlidePropertiesMa
  | SlidePropertiesSelect
  | SlidePropertiesSort
  | SlidePropertiesVocab;
