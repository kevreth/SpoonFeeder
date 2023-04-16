import type { SlideInterface } from '../../quiz/mediator';
import { isEqual } from '../../quiz/mediator';
export class Json {
  private static json: Array<SlideInterface> = [];
  public static get() {
    return Json.json;
  }
  public static set(json: Array<SlideInterface>) {
    Json.json = json;
  }
  public static getMatchingSlide(idx: number) {
    return Json.get()[idx];
  }
  public static findMatchingSlide(txt: string) {
    return Json.get().findIndex((slide) => isEqual(slide.txt, txt));
  }
  public static getFirstSlide() {
    return Json.get()[0];
  }
}
