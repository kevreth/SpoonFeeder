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
