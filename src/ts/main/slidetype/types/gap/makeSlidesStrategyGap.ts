import type { AnswerType, SlideInterface } from '../../../slide/mediator';
import { createPageContent } from '../../misc/createPageContent/createPageContent';
import type { SetWidthTypeComplex } from '../../strategies/setWidthsStrategy/setWidthsStrategy';
import type { CreateHtmlTypeGap } from './createHtmlGap';
export type MakeSlidesTypeGap = (
  txt: string,
  ans: AnswerType,
  createHtml: CreateHtmlTypeGap,
  maxWidthStrategy: SetWidthTypeComplex,
  doc: Document,
  slide: SlideInterface
) => void;
//===the main divs are
//fills: the strings to drag into the gaps
//gaps: the blanks to drag strings to
//remaining: the number of remaining gaps
//response: grading after the last drop
export const makeSlidesStrategyGap: MakeSlidesTypeGap = function (
  txt,
  ans,
  createHtml,
  maxWidthStrategy,
  doc,
  slide
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
  setupTouchDnD(doc, slide, txt);
};
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
      slide.conclude(doc, res as AnswerType, txt);
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
function setupTouchDnD(doc: Document, slide: SlideInterface, txt: string): void {
  const fillsDiv = doc.getElementById('fills') as HTMLElement;
  fillsDiv.addEventListener(
    'touchstart',
    (e: TouchEvent) => {
      const fillEl = (e.target as HTMLElement).closest(
        '[id^="fill"]'
      ) as HTMLElement | null;
      if (!fillEl?.classList.contains('fills')) return;
      e.preventDefault();
      const touch = e.touches[0];
      const rect = fillEl.getBoundingClientRect();
      const offsetX = touch.clientX - rect.left;
      const offsetY = touch.clientY - rect.top;
      const cs = window.getComputedStyle(fillEl);
      const ghost = fillEl.cloneNode(true) as HTMLElement;
      ghost.style.position = 'fixed';
      ghost.style.zIndex = '9999';
      ghost.style.pointerEvents = 'none';
      ghost.style.margin = '0';
      ghost.style.color = cs.color;
      ghost.style.backgroundColor = cs.backgroundColor;
      ghost.style.fontSize = cs.fontSize;
      ghost.style.padding = cs.padding;
      ghost.style.left = `${touch.clientX - offsetX}px`;
      ghost.style.top = `${touch.clientY - offsetY}px`;
      doc.body.appendChild(ghost);
      const onMove = (ev: TouchEvent) => {
        ev.preventDefault();
        const t = ev.touches[0];
        ghost.style.left = `${t.clientX - offsetX}px`;
        ghost.style.top = `${t.clientY - offsetY}px`;
      };
      const onEnd = (ev: TouchEvent) => {
        doc.removeEventListener('touchmove', onMove);
        doc.removeEventListener('touchend', onEnd);
        doc.removeEventListener('touchcancel', onEnd);
        ghost.style.display = 'none';
        const t = ev.changedTouches[0];
        const target = doc.elementFromPoint(
          t.clientX,
          t.clientY
        ) as HTMLElement | null;
        ghost.remove();
        const gapEl = target?.closest('[id^="gap"]') as HTMLElement | null;
        if (!gapEl?.ondrop) return;
        const gapNumber = gapEl.dataset.number as string;
        const fillText = fillEl.dataset.text as string;
        const fillNumber = fillEl.dataset.number as string;
        gapEl.style.removeProperty('background-color');
        gapEl.ondrop = null;
        const fillsRemaining = drop(doc, gapNumber, fillText, fillNumber);
        if (fillsRemaining === 0) {
          const res = evaluate(doc);
          slide.conclude(doc, res as AnswerType, txt);
        }
      };
      doc.addEventListener('touchmove', onMove, { passive: false });
      doc.addEventListener('touchend', onEnd);
      doc.addEventListener('touchcancel', onEnd);
    },
    { passive: false }
  );
}
