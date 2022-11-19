import { gsap } from 'gsap';
import { Draggable } from 'gsap/dist/Draggable';
import { showButton } from '../../../makeSlides';
import type { SlideInterface } from '../../../slideInterface';
import { playAudio } from '../../audio';
import { createPageContent } from '../../createPageContent';
import type { CreateHtmlTypeSort } from '../createHtmlStrategy';
import type { AnswerType } from '../resultStrategy';

export function makeSlidesStrategySort(
  txt: string,
  ans: AnswerType,
  createHtml: CreateHtmlTypeSort,
  doc: Document,
  setValues: SlideInterface
): void {
  const html = createHtml(txt, ans);
  createPageContent(html, doc);
  gsap.registerPlugin(Draggable);
  const rowSize = 100; // => container height / number of items
  const container = doc.querySelector('.container');
  const listItems = Array.from(doc.querySelectorAll('.list-item')); // Array of elements
  const sortables = listItems.map(Sortable); // Array of sortables
  const total = sortables.length;
  gsap.to(container, { duration: 0.5, autoAlpha: 1 });
  const done = doc.getElementById('btn') as HTMLElement;
  done.addEventListener('click', () => {
    conclude(sortables, setValues, doc, done, txt);
  });
  function Sortable(element: Element, index: number) {
    const animation = gsap.to(element, {
      duration: 0.3,
      boxShadow: 'rgba(0,0,0,0.2) 0px 16px 32px 0px',
      force3D: true,
      scale: 1.1,
      paused: true,
    });
    const dragger = new Draggable(element, {
      onDragStart: downAction,
      onRelease: upAction,
      onDrag: dragAction,
      cursor: 'inherit',
      type: 'y',
    });
    // Public properties and methods
    const sortable = {
      dragger: dragger,
      element: element,
      index: index,
      setIndex: setIndex,
    };
    gsap.set(element, { y: index * rowSize });
    function setIndex(index: number) {
      sortable.index = index;
      // Don't layout while dragging
      if (!dragger.isDragging) layout();
    }
    function downAction(this: Draggable) {
      animation.play();
      this.update();
    }
    function dragAction(this: Draggable) {
      // Calculate the current index based on element's position
      const index = clamp(Math.round(this.y / rowSize), 0, total - 1);
      if (index !== sortable.index) changeIndex(sortable, index);
    }
    function upAction() {
      animation.reverse();
      layout();
    }
    function layout() {
      gsap.to(element, { duration: 0.3, y: sortable.index * rowSize });
    }
    function changeIndex(item: typeof sortable, to: number) {
      // Change position in array
      arrayMove(sortables, item.index, to);
      // Set index for each sortable
      sortables.forEach((sortable, index) => {
        sortable.setIndex(index);
      });
    }
    // Changes an elements's position in array
    function arrayMove(
      array: Array<typeof sortable>,
      from: number,
      to: number
    ) {
      array.splice(to, 0, array.splice(from, 1)[0]);
    }
    // Clamps a value to a min/max
    function clamp(value: number, a: number, b: number) {
      return value < a ? a : value > b ? b : value;
    }
    return sortable;
  }
}
function conclude(
  sortables: { element: Element }[],
  setValues: SlideInterface,
  doc: Document,
  done: HTMLElement,
  txt: string
) {
  done.remove();
  const res = evaluate(sortables);
  setValues.setRes(res);
  setValues.saveData();
  const isCorrect = decorate(setValues, doc);
  playAudio(isCorrect);
  showButton(doc, txt);
}
function decorate(setValues: SlideInterface, doc: Document) {
  const isCorrect = setValues.result() as boolean;
  mark(isCorrect, doc);
  return isCorrect;
}

function evaluate(sortables: { element: Element }[]) {
  return sortables.map((x) => x.element.innerHTML);
}
function mark(isCorrect: boolean, doc: Document) {
  const msg = isCorrect ? 'correct' : 'incorrect';
  const content = doc.getElementById('content') as HTMLElement;
  content.insertAdjacentHTML('beforeend', msg);
}
