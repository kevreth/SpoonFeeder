import type { Course } from './course';
import type { SlideInterface } from '../slideInterface';
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
}
