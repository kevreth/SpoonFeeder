import type { Course } from './quiz/course';
import type { AnswerType } from './quiz/slide/strategies/resultStrategy';
import type { SlideInterface } from './quiz/slideInterface';
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
  private static counter = 0;
  private static json: Array<SlideInterface> = [];
  public static get() {
    return Json.json;
  }
  public static set(json: Array<SlideInterface>) {
    Json.json = json;
  }
  public static getSlide() {
    const retval = Json.json[Json.counter];
    Json.counter++;
    return retval;
  }
  public static getCurrentSlide() {
    return Json.json[Json.counter];
  }
  public static getPrevSlide() {
    //-2 because the counter is advanced during the last getSlide()
    const retval = Json.json[Json.counter - 2];
    Json.counter--;
    return retval;
  }
  public static getSlideByTxt(txt: AnswerType): SlideInterface {
    return Json.json.find((x) => x.txt === txt) as SlideInterface;
  }
  public static getNumSlides(): number {
    return Json.json.length;
  }
  public static push(slide: SlideInterface) {
    Json.json.push(slide);
  }
  public static reset(): void {
    Json.counter = 0;
  }
  public static count(): number {
    return Json.counter;
  }
}
