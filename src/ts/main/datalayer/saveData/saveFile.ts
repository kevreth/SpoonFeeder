import { isEqual } from '../../quiz/utilities';
import type { SlideInterface } from '../../slide/slideInterface';
export class Json {
  private static json: Array<SlideInterface> = [];
  public static get() {
    return Json.json;
  }
  public static set(json: Array<SlideInterface>) {
    Json.json = json;
  }
  public static getMatchingSlide(slides: SlideInterface[], idx: number) {
    return slides[idx];
  }
  public static findMatchingSlide(slides: SlideInterface[], txt: string) {
    return slides.findIndex((slide) => isEqual(slide.txt, txt));
  }
}
