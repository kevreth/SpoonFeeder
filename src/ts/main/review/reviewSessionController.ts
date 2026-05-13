import type { AnswerType, SlideInterface } from '../slide/slideInterface';
import { makeButton } from '../quiz/buttons';
import { showExplainIcon, hideExplainIcon } from '../quiz/explainIcon';
import type { SlideResult } from './reviewTypes';

export class ReviewSessionController {
  private currentIndex = 0;
  private results: SlideResult[] = [];
  private aborted = false;
  private doc: Document | null = null;

  constructor(
    private readonly slides: SlideInterface[],
    private readonly onComplete: (results: SlideResult[]) => void,
  ) {
    this.slides.forEach((slide) => this.wrapSlide(slide));
  }

  private wrapSlide(slide: SlideInterface): void {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (slide as any).conclude = function (
      doc: Document,
      res: AnswerType,
      txt: string,
    ): void {
      slide.setRes(res);
      if (!slide.immediateConclusion) {
        slide.decorate(doc);
      }
      doc.getElementById('btn')?.remove();
      showExplainIcon(slide.exp, doc);
      self.insertReviewContinueButton(doc, slide, txt);
    };
  }

  private insertReviewContinueButton(
    doc: Document,
    slide: SlideInterface,
    txt: string,
  ): void {
    const button = makeButton('continueBtn', 'continueBtn', 'continue');
    const slideElem = doc.getElementById('slide') as HTMLElement;
    doc.getElementById('continueBtn')?.remove();
    slideElem.insertAdjacentHTML('beforeend', button);
    const btn = doc.getElementById('continueBtn') as HTMLElement;
    btn?.addEventListener('click', () => {
      if (this.aborted) return;
      const evaluation = slide.evaluate();
      this.results.push({
        slideTxt: txt,
        correct: evaluation.correct,
        total: evaluation.responses,
      });
      this.currentIndex++;
      if (this.currentIndex < this.slides.length) {
        this.renderCurrent();
      } else {
        this.onComplete(this.results);
      }
    });
  }

  private renderCurrent(): void {
    if (!this.doc || this.aborted) return;
    const slide = this.slides[this.currentIndex];
    slide.makeSlides(this.doc);
    hideExplainIcon(this.doc);
  }

  start(doc: Document): void {
    this.doc = doc;
    this.renderCurrent();
  }

  abort(): void {
    this.aborted = true;
  }
}
