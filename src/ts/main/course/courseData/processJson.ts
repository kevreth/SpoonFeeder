import type { Course, SlideInterface } from '../index';
import { process } from '../courseFileProcessor';
import { JsonProcessor } from './jsonProcessor';
export class ProcessJson {
  public static processJson(course: Course) {
    const slides = process(
      course,
      new JsonProcessor(),
      new Array<SlideInterface>()
    );
    slides.forEach((slide, index) => {
      slide.idx = index;
    });
    return slides;
  }
}
