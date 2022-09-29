import type { SlideInterface } from './quiz/slide';
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
  public static getSlideByTxt(txt: string): SlideInterface | undefined {
    return Json.json.find((x) => x.txt === txt);
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
