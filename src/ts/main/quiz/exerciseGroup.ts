import { isEqual } from 'lodash';
import type { SaveData } from './slide/saveData';
import type { SlideInterface } from './slideInterface';

export function exerciseGroupScore(
  saves: SaveData[],
  idx: number,
  slide: SlideInterface
) {
  const results = Array<string>();
  for (const saved of saves) {
    idx = (slide.txt as string[]).findIndex((x) =>
      isEqual(x, saved.txt as string)
    );
    if (idx > -1) {
      results.push(saved.result as string);
    }
  }
  slide.setResults(results);
  return idx;
}
export function exerciseGroupSlideIndex(
  saves: SaveData[],
  txt: string[] | number[],
  retval: number
) {
  for (let i = 0; i < saves.length; i++) {
    const idx = txt.findIndex((x) => isEqual(x, saves[i].txt as string));
    if (idx > -1) retval = i;
  }
  return retval;
}
export function exerciseGroupMakeSlides(
  saves: SaveData[],
  slide: SlideInterface,
  idx: number,
  doc: Document,
  reloadSlide: (slide: SlideInterface, idx: number, doc: Document) => void
) {
  const results = Array<string>();
  for (const saved of saves) {
    const idx2 = (slide.txt as string[]).findIndex((x) =>
      isEqual(x, saved.txt as string)
    );
    if (idx2 > -1) {
      results.push(saved.result as string);
    }
  }
  //TODO: should this just test on the length, or the content?
  if (isEqual(results.length, slide.txt.length)) {
    reloadSlide(slide, idx, doc);
  }
  //not all slide questions answered
  else {
    const results = Array<string>();
    for (const saved of saves) {
      const idx2 = (slide.txt as string[]).findIndex((x) =>
        isEqual(x, saved.txt as string)
      );
      if (idx2 > -1) {
        results.push(saved.result as string);
      }
    }
    slide.setResults(results);
    slide.makeSlides(doc);
  }
}
export function exerciseGroupReloadSlide(
  saves: SaveData[],
  slide: SlideInterface,
  doc: Document,
  showSlides: (doc: Document) => void
) {
  const results = Array<string>();
  for (const saved of saves) {
    const idx2 = (slide.txt as string[]).findIndex((x) =>
      isEqual(x, saved.txt as string)
    );
    if (idx2 > -1) {
      results.push(saved.result as string);
    }
  }
  slide.setResults(results);
  showSlides(doc);
}
