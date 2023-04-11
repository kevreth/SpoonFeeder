import { INDETERMINANT } from '../../../../markupColors';
import { removeListener } from '../../../../utilities';
import type { SlideInterface } from '../../../slideInterface';
import { conclude } from '../../conclude';
import { createPageContent } from '../../createPageContent';
import type { CreateHtmlTypeSelect } from '../createHtmlStrategy';
export function makeSlidesStrategySelect(
  inst: string,
  txt: string,
  createHtml: CreateHtmlTypeSelect,
  doc: Document,
  slide: SlideInterface
) {
  const txtarr = txt.split(' ');
  const html = createHtml(inst, txtarr);
  createPageContent(html, doc);
  for (let ctr = 0; ctr < txtarr.length; ctr++) addEventListener1(ctr + 1, doc);
  addEventListener(doc, txtarr, slide, txt);
}
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
    conclude(doc, slide, res, txt);
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
  return responses;
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
