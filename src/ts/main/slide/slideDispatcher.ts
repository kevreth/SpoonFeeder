import { Json, SaveData } from '../datalayer/mediator';
import { hideExplainIcon, startOverButton } from '../quiz/buttons';
import { evaluate } from '../quiz/evaluate';
import type { StateActions } from '../quiz/stateActionDispatcher';
import { dispatch2 } from '../quiz/stateActionDispatcher';
import { conclude } from './conclude/conclude';
import type { SlideInterface } from './slideInterface';
import type { AnswerType } from './strategies/resultStrategy';
export function showSlides(doc: Document): void {
  const ss = new SlideDispatcher(doc);
  dispatch2(ss, true);
}
export function fillMatchingSlide(slide: SlideInterface, last: SaveData) {
  slide.cont = last.cont;
  slide.res = last.result;
}
export class SlideDispatcher implements StateActions<void> {
  constructor(public doc: Document
  ) {}
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
    if (!slide.immediateConclusion)
      conclude(this.doc, slide, slide.res as AnswerType, slide.txt);
  }
  next(): void {
    const slide = this.getSlide(1);
    slide.makeSlides(this.doc);
    hideExplainIcon(this.doc);
  }
  end(): void {
    const json = Json.get();
    this.doc.body.innerHTML = evaluate(json);
    startOverButton(this.doc);
  }
}
