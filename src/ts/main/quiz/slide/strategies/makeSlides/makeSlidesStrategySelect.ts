import type { CreateHtmlTypeSelect } from '../../../../../main/quiz/slide/strategies/createHtml';
import {
  difference,
  intersection,
  removeListener,
} from '../../../../utilities';
import { MakeSlides } from '../../../makeSlides';
import { SetValues, Slide } from '../../../slide';
const { createPageContent } = Slide;
const { showButton } = MakeSlides;

export function makeSlidesStrategySelect(
  inst: string,
  ans: number[],
  txt: string[],
  createHtml: CreateHtmlTypeSelect,
  doc: Document,
  setValues: SetValues<number[]>
) {
  const html = createHtml(inst, txt);
  createPageContent(html, doc);
  for (let ctr = 0; ctr < txt.length; ctr++) iter2(ctr + 1, doc);
  const element = doc.getElementById('btn') as HTMLElement;
  const numWords = txt.length;
  element.addEventListener('click', () => {
    const res = evaluate2(element, numWords, ans, doc);
    setValues.setRes(res);
    setValues.saveData();
    showButton(doc);
  });
}
function iter2(ctr: number, doc: Document): void {
  const element = doc.getElementById('w' + ctr) as HTMLElement;
  element.addEventListener('click', (event) => {
    selected((event.target as Element).id, doc);
  });
}
function selected(id: string, doc: Document): void {
  const element = doc.getElementById(id) as HTMLElement;
  let color = 'white';
  if (element.style.backgroundColor === 'blue') {
    element.style.removeProperty('background-color');
    color = 'black';
  } else element.style.backgroundColor = 'blue';
  element.style.color = color;
}
function evaluate2(
  element: Element,
  numWords: number,
  ans: Array<number>,
  doc: Document
): Array<number> {
  const responses: number[] = mark(doc);
  //remove event listeners from words to prevent selection after submission
  removeEventListeners(numWords, doc);
  decorate(ans, responses, doc);
  element.remove();
  return responses;
}
function mark(doc: Document) {
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
function decorate(ans: number[], responses: number[], doc: Document) {
  //items that were not selected but should have been
  let diff = difference(ans, responses);
  style(diff, 'underline', 'red', doc);
  //items that should not have been selected but were
  diff = difference(responses, ans);
  style(diff, 'line-through', 'red', doc);
  //correctly selected items
  diff = intersection(responses, ans);
  style(diff, 'underline', 'green', doc);
}
function style(
  diff: Array<number>,
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
