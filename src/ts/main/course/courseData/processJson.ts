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
    _checkForDuplicateText(slides);
    return slides;
  }
}

function _checkForDuplicateText(slides: SlideInterface[]) {
  const seen = new Set<string>();
  slides.forEach((slide) => {
    if (slide.txt && seen.has(slide.txt)) {
      console.warn(
        `Duplicate slide text detected: "${slide.txt}". This may cause navigation and saving issues.`
      );
    }
    seen.add(slide.txt);
  });
}
