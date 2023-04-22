import type { Course, SlideInterface } from '../mediator';
import { INFO, JsonProcessor, initSlide, process } from '../mediator';
export class ProcessJson {
  public static processJson(course: Course) {
    return process(course, new JsonProcessor(), new Array<SlideInterface>());
  }
  public static titleSlideText(type: string, counter: number, name: string) {
    counter++;
    return `${type} ${counter}:<br>${name}`;
  }
  public static loadQuestions(
    slides: Array<SlideInterface>, //the currently processed slides
    questions: Array<SlideInterface>, //raw slides to add in object notation form
    isExercise: boolean
  ): void {
    const processedSlides = new Array<SlideInterface>();
    questions.forEach((item) => initSlide2(item, isExercise, processedSlides));
    slides.push(...processedSlides);
  }
  public static addNewInfoSlide(text: string) {
    const slide = INFO() as SlideInterface;
    slide.immediateConclusion = true;
    slide.txt = text;
    return slide;
  }
}
function initSlide2(
  item: SlideInterface,
  isExercise: boolean,
  processedSlides: SlideInterface[]
) {
  item.isExercise = isExercise;
  const lides = initSlide(item);
  processedSlides.push(...(Array.isArray(lides) ? lides : [lides]));
}
