import type { SlideInterface } from '../../../slideInterface';
import { conclude } from '../../conclude';
import { createPageContent } from '../../createPageContent';
import type { CreateHtmlTypeGap } from '../createHtmlStrategy';
import type { AnswerType } from '../resultStrategy';
import type { SetWidthTypeComplex } from '../setWidthsStrategy';
//===the main divs are
//fills: the strings to drag into the gaps
//gaps: the blanks to drag strings to
//remaining: the number of remaining gaps
//response: grading after the last drop
export function makeSlidesStrategyGap(
  txt: string,
  ans: AnswerType,
  createHtml: CreateHtmlTypeGap,
  maxWidthStrategy: SetWidthTypeComplex,
  doc: Document,
  slide: SlideInterface
): void {
  const _fills = fills(ans);
  const _gaps = gaps(ans.length, txt);
  const remaining = ans.length.toString();
  const html = createHtml(remaining, _fills, _gaps);
  createPageContent(html, doc);
  (ans as string[]).forEach((currentFills, ctr) => {
    setfills(ctr, currentFills, doc);
    setgap(ctr, doc, txt, slide);
  });
  maxWidthStrategy(ans.length, 'fill', 'gap', doc);
}
export function fills(ans: AnswerType): string {
  let fill_accum = '';
  (ans as string[]).forEach((currentFills, ctr) => {
    const fill_html =
      `\n    <span id="fill${ctr}" ` +
      `class="fills" draggable="true">${currentFills} &nbsp;&nbsp;</span>`;
    fill_accum = fill_accum.concat(fill_html);
  });
  return fill_accum;
}
export function gaps(length: number, gaps: string): string {
  let gaps_accum = '';
  for (let ctr = 0; ctr < length; ctr++) {
    gaps = gaps.concat('\n'); //format generated code for easier debugging
    const gap_number = ctr + 1;
    const str = '(' + gap_number.toString() + ')';
    const pos = gaps.search(str);
    const text = gaps.substring(0, pos - 1);
    gaps = gaps.replace(text, '');
    const gap_html = `\n    <span id="gap${ctr}" draggable="false">&nbsp;</span>\n`;
    gaps_accum = gaps_accum.concat(text + gap_html);
  }
  //a remaining part of gaps is leftover, so we add it here.
  return gaps_accum + gaps;
}
function setgap(
  ctr: number,
  doc: Document,
  txt: string,
  slide: SlideInterface
): void {
  const id = doc.getElementById('gap' + ctr) as HTMLElement;
  id.style.display = 'inline-block';
  id.style.borderBottom = '2px solid';
  id.dataset.number = ctr.toString();
  id.ondragstart = (e) => {
    e.preventDefault();
  };
  id.ondragenter = (e) => {
    e.preventDefault();
  };
  id.ondragover = (e) => {
    e.preventDefault();
    (e.target as HTMLElement).style.backgroundColor = 'grey';
    (e.dataTransfer as DataTransfer).dropEffect = 'move';
  };
  id.ondragleave = (e) => {
    e.preventDefault();
    (e.target as HTMLElement).style.removeProperty('background-color');
  };
  id.ondrop = (e) => {
    e.preventDefault();
    const fillNumber = (e.dataTransfer as DataTransfer).getData('number');
    const fillText = (e.dataTransfer as DataTransfer).getData('text');
    const gapNumber = (e.target as HTMLElement).dataset.number as string;
    const fillsRemaining = drop(doc, gapNumber, fillText, fillNumber);
    if (fillsRemaining === 0) {
      const res = evaluate(doc);
      conclude(doc, slide, res, txt);
    }
    id.ondrop = null;
    (e.target as HTMLElement).style.removeProperty('background-color');
  };
}
function evaluate(doc: Document): Array<string> {
  const responses: string[] = [];
  const ansId = doc.getElementsByClassName('ans');
  Array.prototype.forEach.call(ansId, (slide) => {
    const response = slide.innerText as never;
    responses.push(response);
  });
  return responses;
}
function drop(
  doc: Document,
  gapNumber: string,
  fillText: string,
  fillNumber: string
) {
  const gap = doc.getElementById('gap' + gapNumber) as HTMLElement;
  gap.innerHTML = `<span id = "ans${gapNumber}" class="ans">${fillText}</span>`;
  const fill = doc.getElementById('fill' + fillNumber) as HTMLElement;
  fill.innerHTML = '&nbsp;';
  fill.removeAttribute('class');
  const fillsRemaining = doc.getElementsByClassName('fills').length;
  const remaining = doc.getElementById('remaining') as HTMLElement;
  remaining.innerHTML = fillsRemaining.toString();
  return fillsRemaining;
}
function setfills(ctr: number, currentFills: string, doc: Document): void {
  const id = doc.getElementById('fill' + ctr) as HTMLElement;
  id.dataset.number = ctr.toString();
  id.dataset.text = currentFills;
  id.ondragstart = (e) => {
    const number = (e.target as HTMLElement).dataset.number as string;
    const text = (e.target as HTMLElement).dataset.text as string;
    (e.dataTransfer as DataTransfer).setData('number', number);
    (e.dataTransfer as DataTransfer).setData('text', text);
  };
}
