import { last } from '../utilities';
import { startOverButton } from './buttons';
import { Json } from './datalayer/globals';
import { SaveData } from './datalayer/saveData';
import { evaluate } from './evaluate';
import { conclude } from './slide/conclude';
import type { AnswerType } from './slide/strategies/resultStrategy';
import type { SlideInterface } from './slideInterface';
import type { StateActions } from './stateActionDispatcher';
import { dispatch2 } from './stateActionDispatcher';
export function showSlides(doc: Document): void {
  const ss = new SlideDispatcher(Json.get(), SaveData.get(), doc);
  dispatch2(ss, true);
}
export function fillMatchingSlide(slide: SlideInterface, last: SaveData) {
  slide.cont = last.cont;
  slide.res = last.result;
}
export class SlideDispatcher implements StateActions<void> {
  constructor(
    public slides: SlideInterface[],
    public saves: SaveData[],
    public doc: Document
  ) {}
  private getSlide(increment: number) {
    const save = last(this.saves) as SaveData;
    const idx = Json.findMatchingSlide(this.slides, save.txt);
    const slide = Json.getMatchingSlide(this.slides, idx + increment);
    fillMatchingSlide(slide, save);
    return slide;
  }
  begin(): void {
    const slide = this.slides[0];
    slide.makeSlides(this.doc);
  }
  current(): void {
    throw new Error('Method not implemented.');
  }
  decorate(): void {
    const slide = this.getSlide(0);
    slide.makeSlides(this.doc);
    if(!slide.immediateConclusion)
      conclude(this.doc, slide, slide.res as AnswerType, slide.txt);
  }
  next(): void {
    const slide = this.getSlide(1);
    slide.makeSlides(this.doc);
  }
  end(): void {
    const json = Json.get();
    this.doc.body.innerHTML = evaluate(json); //EXECUTION ENDS
    startOverButton(this.doc);
  }
}
