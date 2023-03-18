import { isRandom, shuffle } from '../../../../utilities';
import type { SlideInterface } from '../../../slideInterface';
import { conclude } from '../../conclude';
import { createPageContent } from '../../createPageContent';
import type { CreateHtmlTypeMa } from '../createHtmlStrategy';
import type { SetWidthTypeSimple } from '../setWidthsStrategy';
export function makeSlidesStrategyMa(
  txt: string,
  options: string[],
  isExercise: boolean,
  createHtml: CreateHtmlTypeMa,
  maxWidthStrategy: SetWidthTypeSimple,
  doc: Document,
  slide: SlideInterface
) {
  const shuffleFlag = isExercise && isRandom();
  if (shuffleFlag) options = shuffle(options);
  const html = createHtml(txt, options);
  createPageContent(html, doc);
  const numOptions = options.length;
  maxWidthStrategy(numOptions, 'btn', doc);
  // options.forEach((option, optionCtr) => {
  //   // addEventListener(doc, option, optionCtr, slide, txt);
  // });
}
// function addEventListener(
//   doc: Document,
//   option: string,
//   optionCtr: number,
//   slide: SlideInterface,
//   txt: string
// ): void {
//   const element = doc.getElementById('btn' + optionCtr) as HTMLElement;
//   element.addEventListener('click', () => {
//     conclude(doc, slide, option, txt);
//   });
// }
