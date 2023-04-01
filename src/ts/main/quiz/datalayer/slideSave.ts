import { SaveData } from './saveData';
import { SlideInterface } from '../slideInterface';
import { isEqual, last } from '../../utilities';
import { MakeSlides } from '../makeSlides';
import { Json } from './globals';
export class SlideSaveMethods {
  public fillMatchingSlide(slide: SlideInterface, last: SaveData) {
    slide.cont = last.cont;
    slide.res = last.result;
  }
  public getMatchingSlide(slides: SlideInterface[], idx: number) {
    return slides[idx];
  }
  public findMatchingSlide(slides: SlideInterface[], last: SaveData) {
    return slides.findIndex((slide) => isEqual(slide.txt, last.txt));
  }
  public getLastSave(saves: SaveData[]) {
    return last(saves);
  }
}
export class SlideSave {
  constructor(
    public slides: SlideInterface[],
    public saves: SaveData[],
    public methods: SlideSaveMethods
  ) { }
  public getCurrentSlide(ignoreCont:boolean) {
    // assert(slides.length > 0)
    let slide = this.slides[0];
    if(this.saves.length > 0) {
      const save = this.methods.getLastSave(this.saves) as SaveData;
      let idx = this.methods.findMatchingSlide(this.slides, save);
      // assert(idx>-1);
      if(save.cont && idx !== this.slides.length - 1 && !ignoreCont) idx += 1;
      slide = this.methods.getMatchingSlide(this.slides, idx);
      this.methods.fillMatchingSlide(slide, save);
    }
    return slide;
  }
  public getRefreshState(slide: SlideInterface): RefreshState {
    let retval = RefreshState.DECORATE;
    if(slide.cont && (this.slides.length === this.saves.length))
      retval = RefreshState.END;
    else if (slide.cont)
      retval = RefreshState.PLAIN;
    return retval;
  }
  public getSlide(state: RefreshState, rules: MakeSlidesI) {
    switch(state) {
      case RefreshState.DECORATE:
        rules.showDecoratedSlide();
        break;
      case RefreshState.PLAIN:
        rules.showUndecoratedSlide();
        break;
      case RefreshState.END:
        rules.finishQuiz();
        break;
    }
  }
}
export enum RefreshState {
  END,
  DECORATE,
  PLAIN
}
export interface MakeSlidesI {
  finishQuiz(): void;
  showDecoratedSlide(): void;
  showUndecoratedSlide(): void;
}
export class MakeSlides2 implements MakeSlidesI {
  constructor(
    public slide:SlideInterface,
    public doc:Document
  ) {}
  finishQuiz(): void {
    MakeSlides.endQuiz(this.doc);
  }
  showDecoratedSlide(): void {
    this.showUndecoratedSlide();
    this.slide.decorate(this.doc);
  }
  showUndecoratedSlide(): void {
    this.slide.makeSlides(this.doc);
  }
}
export function slideSaveFactory() {
  return new SlideSave(Json.get(),SaveData.get(),new SlideSaveMethods());
}