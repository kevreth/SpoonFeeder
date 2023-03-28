import { isRandom, shuffle } from '../utilities';
import type { Course, Division, Module } from './course';
import { INFO, initSlide } from './slideFactory';
import type { SlideInterface } from './slideInterface';
import {DivisionProcessor, process} from './dataManager'
//////////////// Phase 1: process Json
export class JsonProcessor implements DivisionProcessor<void,void,SlideInterface[]> {
  private addNewInfoSlide(name: string, ctr: number, child: Division, retval: SlideInterface[]) {
    const title = ProcessJson.titleSlideText(name, ctr, child.name);
    ProcessJson.addNewInfoSlide(title, retval);
  }
  course_start(course: Division, retval: SlideInterface[]): void {
    ProcessJson.addNewInfoSlide(course.name, retval);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  unit_start(child: Division, ctr: number, retval: SlideInterface[], parent: void): void {
    this.addNewInfoSlide('Unit', ctr, child, retval);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  lesson_start(child: Division, ctr: number, retval: SlideInterface[], parent: void): void {
    this.addNewInfoSlide('Lesson', ctr, child, retval);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  module_start(child: Module, ctr: number, retval: SlideInterface[], parent: void): void {
    this.addNewInfoSlide('Module', ctr, child, retval);
    ProcessJson.loadQuestions(retval, child.inst, false);
    if (isRandom()) child.exercises = shuffle(child.exercises);
    ProcessJson.loadQuestions(retval, child.exercises, true);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  inst(slide: SlideInterface, ctr: number, retval: SlideInterface[], parent: void): SlideInterface[] {
    return new Array<SlideInterface>();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  exercises(slide: SlideInterface, ctr: number, retval: SlideInterface[], parent: void): SlideInterface[] {
    return new Array<SlideInterface>();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  module_end(child: void, retval: SlideInterface[], parent: void): void {
    return;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  lesson_end(child: void, retval: SlideInterface[], parent: void): void {
    return;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  unit_end(child: void, retval: SlideInterface[], parent: void): void {
    return;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  course_end(course: void, retval: SlideInterface[]): void {
    return;
  }
}
export class ProcessJson {
  public static processJson(course: Course) {
    let slides = new Array<SlideInterface>();
    slides = process(course, new JsonProcessor(), slides);
    return slides;
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
    questions.forEach((item) => {
      item.isExercise = isExercise;
      const slides = initSlide(item);
      if (Array.isArray(slides)) processedSlides.push(...slides);
      else processedSlides.push(slides);
    });
    slides.push(...processedSlides);
  }
  public static addNewInfoSlide(text: string, slides: SlideInterface[]) {
    const slide = INFO() as SlideInterface;
    slide.txt = text;
    slides.push(slide);
  }
}
