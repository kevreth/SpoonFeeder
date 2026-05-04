import type { AnswerType, SlideInterface } from '../slide/slideInterface';
import type { StateActions } from './stateActionDispatcher';
import { Json } from '../dataaccess/saveData/saveFile';
import { SaveData } from '../dataaccess/saveData/saveData';
import { dispatch2 } from './stateActionDispatcher';
import { evaluate } from './evaluate';
import { hideExplainIcon } from './explainIcon';
import { startOverButton } from './startOverButton';
export function showSlides(doc: Document): void {
  const ss = new SlideDispatcher(doc);
  dispatch2(ss, true);
}
export function fillMatchingSlide(slide: SlideInterface, last: SaveData) {
  slide.cont = last.cont;
  slide.res = last.result;
}
class SlideDispatcher implements StateActions<void> {
  constructor(public doc: Document) {}
  private getSlide(increment: number) {
    const save = SaveData.lastSavedItem();
    const idx = Json.findMatchingSlide(save.txt);
    const slide = Json.getMatchingSlide(idx + increment);
    fillMatchingSlide(slide, save);
    return slide;
  }
  begin(): void {
    const slide = Json.getFirstSlide();
    slide.makeSlides(this.doc);
    hideExplainIcon(this.doc);
  }
  current(): void {
    throw new Error('Method not implemented.');
  }
  decorate(): void {
    const slide = this.getSlide(0);
    slide.makeSlides(this.doc);
    if (!slide.immediateConclusion) {
      slide.conclude(this.doc, slide.res as AnswerType, slide.txt);
    }
  }
  next(): void {
    const slide = this.getSlide(1);
    slide.makeSlides(this.doc);
    hideExplainIcon(this.doc);
  }
  end(): void {
    const json = Json.get();
    const content = this.doc.getElementById('content');
    if (content) {
      content.innerHTML = evaluate(json);
    } else {
      this.doc.body.innerHTML = evaluate(json);
    }
    startOverButton(this.doc);
  }
}
