import { getChildIds, removeListener } from '../../../../utilities';
import type { AdocVisitorInterface } from '../../../datalayer/adocVisitor';
import { AdocVisitor } from '../../../datalayer/adocVisitor';
import { Slide } from '../../../slide';
import type { SlideInterface } from '../../../slideInterface';
import type { MarkTypeImap, SlideType } from '../slideType';
import type { MakeSlidesTypeImap } from '../../strategies/makeSlidesStrategy';
export class Imap extends Slide implements SlideType {
  img = '';
  processJson(json: SlideInterface): void {
    const json1 = json as Imap
    ({
      txt: this.txt,
      img: this.img,
      ans: this.ans,
      isExercise: this.isExercise,
    } = json1);
    this.accept(new AdocVisitor());
  }
  accept(visitor: AdocVisitorInterface): void {
    visitor.visitImap(this);
  }
  makeSlides(doc: Document): void {
    const txt = this.txt;
    const img = this.img;
    const createHtml = this.createHtml;
    const makeSlidesStrategy = this.makeSlidesStrategy as MakeSlidesTypeImap;
    makeSlidesStrategy(txt, img, createHtml, doc, this);
  }
  decorate(doc: Document) {
    const ids = getChildIds(doc, 'imagemap');
    ids.forEach((id) => {
      const element = doc.getElementById(id) as HTMLElement;
      element.classList.remove('shape');
      removeListener(element);
    });
    const isCorrect = this.result() as boolean;
    const res = this.getRes() as string;
    this.mark(isCorrect, res, doc);
    return isCorrect;
  }
  mark: MarkTypeImap = (isCorrect, id, doc) => {
    const classname = isCorrect ? 'shape_correct' : 'shape_incorrect';
    const element = doc.getElementById(id) as HTMLElement;
    element.classList.add(classname);
  }
}
