import { INDETERMINANT } from '../../markupColors';
import type { SlideInterface } from '../../../slideInterface';
import { conclude } from '../../conclude/conclude';
import { createPageContent } from '../../createPageContent/createPageContent';
import type { CreateHtmlTypeMa } from '../../strategies/createHtmlStrategy';
import type { SetWidthTypeSimple } from '../../strategies/setWidthsStrategy/setWidthsStrategy';
export type MakeSlidesTypeMa = (
  txt: string,
  options: string[],
  createHtml: CreateHtmlTypeMa,
  maxWidthStrategy: SetWidthTypeSimple,
  doc: Document,
  setValues: SlideInterface
) => void;
export function makeSlidesStrategyMa(
  txt: string,
  options: string[],
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
      if (btn.style.backgroundColor === color) {
        btn.style.backgroundColor = 'black';
      } else {
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
      if (btn.style.backgroundColor === INDETERMINANT) answers.push(_option);
    });
    answers = answers.sort();
    done.remove();
    conclude(doc, slide, answers, txt);
  });
}
