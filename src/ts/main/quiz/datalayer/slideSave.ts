import { SaveData } from './saveData';
import { SlideInterfaceProperties } from '../slideInterface';
import { isEqual, last } from '../../utilities';
export class SlideSaveMethods {
  public fillMatchingSlide(slide: SlideInterfaceProperties, last: SaveData) {
    slide.cont = last.cont;
    slide.res = last.result;
  }
  public getMatchingSlide(slides: SlideInterfaceProperties[], idx: number) {
    return slides[idx];
  }
  public findMatchingSlide(slides: SlideInterfaceProperties[], last: SaveData) {
    return slides.findIndex((slide) => isEqual(slide.txt, last.txt));
  }
  public getLastSave(saves: SaveData[]) {
    return last(saves);
  }
}
export class SlideSave {
  constructor(
    public slides: SlideInterfaceProperties[],
    public saves: SaveData[],
    public methods: SlideSaveMethods
  ) { }
  public getCurrentSlide() {
    // assert(slides.length > 0)
    let slide = this.slides[0];
    if(this.saves.length > 0) {
      const save = this.methods.getLastSave(this.saves) as SaveData;
      const idx = this.methods.findMatchingSlide(this.slides, save);
      // assert(idx>-1);
      slide = this.methods.getMatchingSlide(this.slides, idx);
      this.methods.fillMatchingSlide(slide, save);
    }
    return slide;
  }
}

