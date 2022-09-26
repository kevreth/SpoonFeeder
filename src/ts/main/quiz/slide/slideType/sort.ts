import { Evaluation } from '../../evaluate';
import { SetValues, Slide } from '../../slide';
import { showButton } from '../../makeSlides';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/dist/Draggable';
import { Result } from '../strategies/result';
import { CreateHtml, SortType } from '../strategies/createHtml';
import { Evaluate } from '../strategies/evaluate';
export class Sort extends Slide<Array<string>> {
  constructor() {
    super('sort');
  }
  resultType = Result.LIST;
  createHtml = CreateHtml.SORT;
  evaluateStrategy = Evaluate.SIMPLE;
  processJson(json: Sort): void {
    ({ txt: this.txt, ans: this.ans, isExercise: this.isExercise } = json);
  }
  makeSlides(doc: Document): void {
    const txt = this.txt;
    const ans = this.ans;
    const createHtml = this.createHtml;
    const setValues = this.getSetValues();
    makeSlides2(doc, setValues, ans, txt, createHtml);
  }
  evaluate(): Evaluation {
    const txt = this.txt;
    const res = this.res;
    const ans = this.ans;
    const result = this.result();
    return this.evaluateStrategy(txt, res, ans, result);
  }
}
function makeSlides2(doc: Document, setValues: SetValues<string[]>, ans:string[], txt:string, createHtml:SortType): void {
  const html = createHtml(txt, ans);
  setValues.createPageContent(html, doc);
  gsap.registerPlugin(Draggable);
  const rowSize = 100; // => container height / number of items
  const container = doc.querySelector('.container');
  const listItems = Array.from(doc.querySelectorAll('.list-item')); // Array of elements
  const sortables = listItems.map(Sortable); // Array of sortables
  const total = sortables.length;
  gsap.to(container, { duration: 0.5, autoAlpha: 1 });
  const done = doc.getElementById('btn') as HTMLElement;
  done.addEventListener('click', () => {
    const res = sortables.map((x) => x.element.innerHTML);
    setValues.setRes(res);
    let msg = 'incorrect';
    if (setValues.result()) msg = 'correct';
    const content = doc.getElementById('content') as HTMLElement;
    content.insertAdjacentHTML('beforeend', msg);
    done.remove();
    setValues.saveData();
    showButton(doc);
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
    function downAction(this:Draggable) {
      animation.play();
      this.update();
    }
    function dragAction(this:Draggable) {
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
