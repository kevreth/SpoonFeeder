import { last } from '../quiz/utilities';
import { hideExplainIcon, startOverButton } from '../quiz/buttons';
import { Json, SaveData } from '../datalayer/mediator';
import { evaluate } from '../quiz/evaluate';
import { conclude } from './conclude/conclude';
import type { AnswerType } from './strategies/resultStrategy';
import type { SlideInterface } from './slideInterface';
import type { StateActions } from '../quiz/stateActionDispatcher';
import { dispatch2 } from '../quiz/stateActionDispatcher';
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
    this.doc.body.innerHTML = evaluate(json); //EXECUTION ENDS
    startOverButton(this.doc);
  }
}
