import { removeListener } from '../../../quiz/mediator';
import type { AnswerType, SlideInterface } from '../../../slide/mediator';
import { createPageContent } from '../../misc/createPageContent/createPageContent';
import { INDETERMINANT } from '../../misc/markupColors';
import type { CreateHtmlTypeSelect } from './createHtmlSelect';
export type MakeSlidesTypeSelect = (
  inst: string,
  txt: string,
  createHtml: CreateHtmlTypeSelect,
  doc: Document,
  slide: SlideInterface
) => void;
export const makeSlidesStrategySelect: MakeSlidesTypeSelect = function (
  inst,
  txt,
  createHtml,
  doc,
  slide
) {
  const txtarr = txt.split(' ');
  const html = createHtml(inst, txtarr);
  createPageContent(html, doc);
  for (let ctr = 0; ctr < txtarr.length; ctr++) addEventListener1(ctr + 1, doc);
  addEventListener(doc, txtarr, slide, txt);
};
function addEventListener(
  doc: Document,
  txtarr: string[],
  slide: SlideInterface,
  txt: string
) {
  const element = doc.getElementById('btn') as HTMLElement;
  const numWords = txtarr.length;
  element.addEventListener('click', () => {
    removeEventListeners(numWords, doc);
    element.remove();
    const res = evaluate(doc);
    slide.conclude(doc, res, txt);
  });
}
function addEventListener1(ctr: number, doc: Document): void {
  const element = doc.getElementById('w' + ctr) as HTMLElement;
  element.addEventListener('click', () => {
    selected(element);
  });
}
function selected(element: HTMLElement): void {
  let color = 'white';
  if (element.style.backgroundColor === INDETERMINANT) {
    element.style.removeProperty('background-color');
    color = 'black';
  } else element.style.backgroundColor = INDETERMINANT;
  element.style.color = color;
}
function evaluate(doc: Document) {
  let found = true;
  let ctr = 1;
  const responses: number[] = [];
  while (found) {
    const id = 'w' + ctr.toString();
    const element = doc.getElementById(id);
    if (element !== null) {
      if (element.style.backgroundColor === INDETERMINANT) responses.push(ctr);
    } else found = false;
    ctr++;
  }
  return responses as AnswerType;
}
function removeEventListeners(numWords: number, doc: Document) {
  for (let i = 1; i <= numWords; i++) {
    const element = doc.getElementById('w' + i.toString()) as HTMLElement;
    //disable word selection
    removeListener(element);
    element.style.removeProperty('background-color');
    element.style.color = 'white';
  }
}
