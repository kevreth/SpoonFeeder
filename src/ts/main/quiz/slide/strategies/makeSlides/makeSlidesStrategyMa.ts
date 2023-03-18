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
  options.forEach((_option, optionCtr) => {
    const btn = doc.getElementById('btn' + optionCtr) as HTMLElement;
    const color = 'blue';
    btn.addEventListener('click', () => {
      if(btn.style.backgroundColor === color) {
        btn.style.backgroundColor = 'black';
      }
      else {
        btn.style.backgroundColor = color;
      }
    });
  });
  const done = doc.getElementById('btn') as HTMLElement;
  done.addEventListener('click', () => {
    // retrieve all buttons in blue
    let answers: string[] = [];
    options.forEach((_option, optionCtr) => {
      const btn = doc.getElementById('btn' + optionCtr) as HTMLElement;
      const color = 'blue';
      if(btn.style.backgroundColor === color) {
        answers.push(_option);
      }
    });
    answers = answers.sort();
    done.remove();
    conclude(doc, slide, answers, txt);
  });
}
