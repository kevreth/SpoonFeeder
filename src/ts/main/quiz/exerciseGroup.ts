// import { isEqual } from 'lodash';
// import type { SaveData } from './slide/saveData';
// import type { SlideInterface } from './slideInterface';

// export function exerciseGroupSlideIndex(
//   saves: SaveData[],
//   txt: string[] & number[],
//   retval: number
// ) {
//   for (let i = 0; i < saves.length; i++) {
//     const save = saves[i].txt as string & number;
//     const includes = txt.includes(save);
//     if (includes) {
//       retval = i;
//       break;
//     }
//   }
//   return retval;
// }
// export function exerciseGroupMakeSlides(
//   saves: SaveData[],
//   slide: SlideInterface,
//   idx: number,
//   doc: Document,
//   reloadSlide: (slide: SlideInterface, idx: number, doc: Document) => void
// ) {
//   const txt = slide.txt as string[];
//   const results = exerciseGroupScore(saves, txt);
//   //TODO: should this just test on the length, or the content?
//   if (isEqual(results.length, slide.txt.length)) {
//     reloadSlide(slide, idx, doc);
//   }
//   //not all slide questions answered
//   else {
//     slide.setResults(results);
//     slide.makeSlides(doc);
//   }
// }
// export function exerciseGroupReloadSlide(
//   saves: SaveData[],
//   slide: SlideInterface,
//   doc: Document,
//   showSlides: (doc: Document) => void
// ) {
//   const txt = slide.txt as string[];
//   const results = exerciseGroupScore(saves, txt);
//   slide.setResults(results);
//   showSlides(doc);
// }
// export function exerciseGroupScore2(result: boolean[]) {
//   return result.filter((value) => value === true).length;
// }
// export function exerciseGroupScore(saves: SaveData[], txt: string[]) {
//   const results = Array<string>();
//   for (const saved of saves) {
//     const includes = txt.includes(saved.txt as string);
//     if (includes) {
//       results.push(saved.result as string);
//     }
//   }
//   return results;
// }
