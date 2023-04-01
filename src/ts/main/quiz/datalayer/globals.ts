import { isEqual } from '../../utilities';
import type { SlideInterface } from '../slideInterface';
import type { Course } from './course';
//Should be replaced by a Pinia store
export class CourseFile {
  private static json: Course;
  public static get() {
    return this.json;
  }
  public static set(json: Course) {
    this.json = json;
  }
}
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
