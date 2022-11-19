import { removeListener } from '../../../../utilities';
import { showButton } from '../../../makeSlides';
import type { SlideInterface } from '../../../slideInterface';
import { playAudio } from '../../audio';
import { createPageContent } from '../../createPageContent';
import type { CreateHtmlTypeSelect } from '../createHtmlStrategy';

export function makeSlidesStrategySelect(
  inst: string,
  txt: string,
  createHtml: CreateHtmlTypeSelect,
  doc: Document,
  setValues: SlideInterface
) {
  const txtarr = txt.split(' ');
  const html = createHtml(inst, txtarr);
  createPageContent(html, doc);
  for (let ctr = 0; ctr < txtarr.length; ctr++) addEventListener1(ctr + 1, doc);
  addEventListener(doc, txtarr, setValues, txt);
}
function addEventListener(
  doc: Document,
  txtarr: string[],
  setValues: SlideInterface,
  txt: string
) {
  const element = doc.getElementById('btn') as HTMLElement;
  const numWords = txtarr.length;
  element.addEventListener('click', () => {
    conclude(element, numWords, doc, setValues, txt);
  });
}

function conclude(
  element: HTMLElement,
  numWords: number,
  doc: Document,
  setValues: SlideInterface,
  txt: string
) {
  removeEventListeners(numWords, doc);
  element.remove();
  const res = evaluate(doc);
  setValues.setRes(res);
  setValues.saveData();
  const isCorrect = setValues.decorate(doc);
  playAudio(isCorrect);
  showButton(doc, txt);
}

function addEventListener1(ctr: number, doc: Document): void {
  const element = doc.getElementById('w' + ctr) as HTMLElement;
  element.addEventListener('click', () => {
    selected(element);
  });
}
function selected(element: HTMLElement): void {
  let color = 'white';
  if (element.style.backgroundColor === 'blue') {
    element.style.removeProperty('background-color');
    color = 'black';
  } else element.style.backgroundColor = 'blue';
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
      if (element.style.backgroundColor === 'blue') responses.push(ctr);
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
