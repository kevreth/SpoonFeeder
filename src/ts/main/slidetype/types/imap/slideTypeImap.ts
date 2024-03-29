import { getChildIds, removeListener } from '../../../quiz/mediator';
import type { SlideInterface } from '../../../slide/mediator';
import { Slide } from '../../../slide/mediator';
import type { AdocVisitorInterface } from '../../misc/adocVisitor';
import { AdocVisitor } from '../../misc/adocVisitor';
import type { MarkTypeImap, SlideType } from '../../misc/slideType';
export class Imap extends Slide implements SlideType {
  setProperties(props: SlideInterface): void {
    ({
      txt: this.txt,
      img: this.img,
      ans: this.ans,
      isExercise: this.isExercise,
    } = props);
    this.accept(new AdocVisitor());
  }
  accept(visitor: AdocVisitorInterface): void {
    visitor.visitImap(this);
  }
  makeSlides(doc: Document): void {
    const txt = this.txt;
    const img = this.img;
    const createHtml = this.createHtml;
    const makeSlidesStrategy = this.makeSlidesStrategy;
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
  };
}
