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
