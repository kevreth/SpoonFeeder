import { getChildIds, removeListener } from '../../../utilities';
import { Slide } from '../../slide';
import type { SlideInterface } from '../../slideInterface';
import type { MakeSlidesTypeImap } from '../strategies/makeSlidesStrategy';
export class Imap extends Slide {
  img = '';
  processJson(json: Imap): void {
    ({
      txt: this.txt,
      img: this.img,
      ans: this.ans,
      isExercise: this.isExercise,
    } = json);
  }
  makeSlides(doc: Document): void {
    const txt = this.txt as string;
    const img = this.img;
    const createHtml = this.createHtml;
    const makeSlidesStrategy = this.makeSlidesStrategy as MakeSlidesTypeImap;
    makeSlidesStrategy(txt, img, createHtml, doc, this);
  }
  decorate(setValues: SlideInterface, doc: Document) {
    const ids = getChildIds(doc, 'imagemap');
    ids.forEach((id) => {
      const element = doc.getElementById(id) as HTMLElement;
      element.classList.remove('shape');
      removeListener(element);
    });
    const isCorrect = setValues.result() as boolean;
    this.mark(isCorrect, setValues.getRes() as string, doc);
    return isCorrect;
  }
  mark(isCorrect: boolean, id: string, doc: Document) {
    const classname = isCorrect ? 'shape_correct' : 'shape_incorrect';
    const element = doc.getElementById(id) as HTMLElement;
    element.classList.add(classname);
  }
}
