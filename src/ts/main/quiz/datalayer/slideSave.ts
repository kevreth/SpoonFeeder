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
    const save = this.methods.getLastSave(this.saves) as SaveData;
    const idx = this.methods.findMatchingSlide(this.slides, save);
    let retval = undefined;
    if(idx > -1) {
      const slide = this.methods.getMatchingSlide(this.slides, idx);
      this.methods.fillMatchingSlide(slide, save);
      retval = slide;
    }
    return retval;
  }
}

