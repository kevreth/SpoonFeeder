import type { SlideInterface } from '../../../slideInterface';
import { conclude } from '../../conclude';
import { createPageContent } from '../../createPageContent';
import type { CreateHtmlTypeMa } from '../createHtmlStrategy';
import type { SetWidthTypeSimple } from '../setWidthsStrategy';
import {INDETERMINANT} from '../../../../MarkupColors';
export function makeSlidesStrategyMa(
  txt: string,
  options: string[],
  isExercise: boolean,
  createHtml: CreateHtmlTypeMa,
  maxWidthStrategy: SetWidthTypeSimple,
  doc: Document,
  slide: SlideInterface
) {
  const html = createHtml(txt, options);
  createPageContent(html, doc);
  const numOptions = options.length;
  maxWidthStrategy(numOptions, 'btn', doc);
  options.forEach((_option, optionCtr) => {
    const btn = doc.getElementById('btn' + optionCtr) as HTMLElement;
    const color = INDETERMINANT;
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
    // retrieve all INDETERMINANT buttons
    let answers: string[] = [];
    options.forEach((_option, optionCtr) => {
      const btn = doc.getElementById('btn' + optionCtr) as HTMLElement;
      if(btn.style.backgroundColor === INDETERMINANT) answers.push(_option);
    });
    answers = answers.sort();
    done.remove();
    conclude(doc, slide, answers, txt);
  });
}