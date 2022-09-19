import type { SlideInterface } from './quiz/slide';
import type { SlideType } from './quiz/course';
import { getInstance } from './quiz/slide/slideFactory';
import { getYaml } from './utilities';
import { Course } from './quiz/course';
import { Globals } from './globals';
import { showSlides } from './quiz/makeSlides';
import { processJson } from './quiz/processJson';
const PREFIX_COURSE_FILE = '../../../src/courses/';
export function slides(courseName: string, doc: Document): void {
  // Phase 1: process Json
  // Phase 2: process Slides
  // Phase 3: make slides
  // Phase 4: evaluate
  //TODO: add test for file existence
  const yaml = PREFIX_COURSE_FILE.concat(courseName, '/course.yml');
  getYaml(yaml, (course: Course) => {
    const slides = processJson(course);
    Globals.JSON.set(processSlides(slides));
    showSlides(doc);
  });
}
//////////////// Phase 2: process Json
export function processSlides(data: Array<SlideType>): Array<SlideInterface> {
  const outJson: Array<SlideInterface> = new Array<SlideInterface>();
  Array.prototype.forEach.call(data, (currentQuestion: SlideType) => {
    const slide = getInstance(currentQuestion.type) as SlideInterface;
    slide.processJson(currentQuestion);
    outJson.push(slide);
  });
  Globals.JSON.reset();
  return outJson;
}
