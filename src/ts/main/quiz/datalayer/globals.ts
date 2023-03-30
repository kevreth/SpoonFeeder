import type { SlideInterface } from '../slideInterface';
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
    return Json.json[Json.counter-1];
  }
  public static reset(): void {
    Json.counter = 0;
  }
  public static count(): number {
    return Json.counter;
  }
}
