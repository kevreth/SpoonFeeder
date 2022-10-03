import { MaxWidth } from '../maxWidth';
export type SetWidthTypeSimple = (
  num: number,
  str: string,
  doc: Document
) => void;
export type SetWidthTypeComplex = (
  num: number,
  str1: string,
  str2: string,
  doc: Document
) => void;
const { getMaxWidth, getNumberedElementsAsList, setWidths, getIdsAsArray } =
  MaxWidth;
export class SetWidths {
  //sets the width on the same set of elements that whose width was measured
  public static readonly SIMPLE: SetWidthTypeSimple = function (
    num: number,
    str: string,
    doc: Document
  ) {
    const ids: Array<string> = getIdsAsArray(num, str);
    const elements: Array<HTMLElement> = getNumberedElementsAsList(ids, doc);
    const maxWidth = getMaxWidth(elements);
    setWidths(ids, doc, maxWidth);
  };
  //sets the width on a different set of elements than whose width was measured
  public static readonly TARGETED: SetWidthTypeComplex = function (
    num: number,
    str: string,
    str2: string,
    doc: Document
  ) {
    const ids: Array<string> = getIdsAsArray(num, str);
    const elements: Array<HTMLElement> = getNumberedElementsAsList(ids, doc);
    const maxWidth = getMaxWidth(elements);
    const gaps: Array<string> = getIdsAsArray(num, str2);
    setWidths(gaps, doc, maxWidth);
  };
}
