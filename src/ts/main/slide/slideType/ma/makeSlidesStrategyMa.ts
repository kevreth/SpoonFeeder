import { conclude } from '../../conclude/conclude';
import { createPageContent } from '../../createPageContent/createPageContent';
import { INDETERMINANT } from '../../markupColors';
import type { SlideInterface } from '../../slideInterface';
import type { AnswerType } from '../../strategies/resultStrategy';
import type { SetWidthTypeSimple } from '../../strategies/setWidthsStrategy/setWidthsStrategy';
import type { CreateHtmlTypeMa } from './createHtmlMa';
export type MakeSlidesTypeMa = (
  txt: string,
  options: string[],
  createHtml: CreateHtmlTypeMa,
  maxWidthStrategy: SetWidthTypeSimple,
  doc: Document,
  slide: SlideInterface
) => void;
export const makeSlidesStrategyMa: MakeSlidesTypeMa = function (
  txt,
  options,
  createHtml,
  maxWidthStrategy,
  doc,
  slide
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
    conclude(doc, slide, answers as AnswerType, txt);
  });
};
