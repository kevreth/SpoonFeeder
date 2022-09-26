import { difference, intersection, removeListener } from '../../../utilities';
import { showButton } from '../../makeSlides';
import { Evaluation } from '../../evaluate';
import { SetValues, Slide } from '../../slide';
import { Result } from '../strategies/result';
import { CreateHtml } from '../strategies/createHtml';
import { Evaluate } from '../strategies/evaluate';
export class Select extends Slide<Array<number>> {
  constructor() {
    super('select');
  }
  inst = '';
  resultType = Result.LIST;
  createHtml = CreateHtml.SELECT;
  evaluateStrategy = Evaluate.SIMPLE;
  processJson(json: Select): void {
    ({
      inst: this.inst,
      txt: this.txt,
      ans: this.ans,
      isExercise: this.isExercise,
    } = json);
  }
  makeSlides(doc: Document): void {
    const res = (this.txt as string).split(' ');
    const ans = this.ans;
    const setValues = this.getSetValues();
    const html = this.createHtml(this.inst, res);
    this.createPageContent(html, doc);
    makeSlides2(res, doc, ans, setValues);
  }
  evaluate(): Evaluation {
    const txt = this.txt;
    const res = this.res;
    const ans = this.ans;
    const result = this.result();
    return this.evaluateStrategy(txt, res, ans, result);
  }
}
function makeSlides2(res: string[], doc: Document, ans: number[], setValues: SetValues<number[]>) {
  for (let ctr = 0; ctr < res.length; ctr++)
    iter2(ctr + 1, doc);
  const element = doc.getElementById('btn') as HTMLElement;
  const numWords = res.length;
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
      if (element.style.backgroundColor === 'blue')
        responses.push(ctr);
    } else
      found = false;
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

