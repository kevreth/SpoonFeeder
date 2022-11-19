import {
  difference,
  intersection,
  removeListener,
} from '../../../../utilities';
import { showButton } from '../../../makeSlides';
import type { SlideInterface } from '../../../slideInterface';
import { playAudio } from '../../audio';
import { createPageContent } from '../../createPageContent';
import type { CreateHtmlTypeSelect } from '../createHtmlStrategy';
import type { AnswerType } from '../resultStrategy';

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
  const isCorrect = decorate(setValues, doc);
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
function decorate(setValues: SlideInterface, doc: Document) {
  const isCorrect = setValues.result() as boolean;
  mark(setValues.getAns(), setValues.getRes(), doc);
  return isCorrect;
}
function mark(ans: AnswerType, res: AnswerType, doc: Document) {
  const _ans = ans as string[];
  const _res = res as string[];
  // items that were not selected but should have been
  let diff = difference(_ans, _res);
  style(diff, 'underline', 'red', doc);
  // items that should not have been selected but were
  diff = difference(_res, _ans);
  style(diff, 'line-through', 'red', doc);
  // correctly selected items
  diff = intersection(_res, _ans);
  style(diff, 'underline', 'green', doc);
}
function style(
  diff: AnswerType,
  decoration: string,
  color: string,
  doc: Document
): void {
  length = diff.length;
  for (let i = 0; i < length; i++) {
    const id = diff[i];
    const element = doc.getElementById('w' + id.toString()) as HTMLElement;
    element.style.textDecoration = decoration;
    element.style.textDecorationColor = color;
    element.style.removeProperty('background-color');
    element.style.color = 'white';
  }
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
