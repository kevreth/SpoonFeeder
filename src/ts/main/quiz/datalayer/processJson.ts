import { isRandom, shuffle } from '../../utilities';
import type { SlideInterface } from '../slideInterface';
import type { Course, Division, Module } from './course';
import type { DivisionProcessor } from './courseFileProcessor';
import { process } from './courseFileProcessor';
import { INFO, initSlide } from './slideFactory';
//////////////// Phase 1: process Json
export class JsonProcessor
  implements DivisionProcessor<void, void, SlideInterface[]>
{
  private addNewInfoSlide(
    name: string,
    ctr: number,
    child: Division,
    retval: SlideInterface[]
  ) {
    const title = ProcessJson.titleSlideText(name, ctr, child.name);
    ProcessJson.addNewInfoSlide(title, retval);
  }
  course_start(course: Division, retval: SlideInterface[]): void {
    ProcessJson.addNewInfoSlide(course.name, retval);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  unit_start(
    child: Division,
    ctr: number,
    retval: SlideInterface[],
    parent: void
  ): void {
    this.addNewInfoSlide('Unit', ctr, child, retval);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  lesson_start(
    child: Division,
    ctr: number,
    retval: SlideInterface[],
    parent: void
  ): void {
    this.addNewInfoSlide('Lesson', ctr, child, retval);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  module_start(
    child: Module,
    ctr: number,
    retval: SlideInterface[],
    parent: void
  ): void {
    this.addNewInfoSlide('Module', ctr, child, retval);
    if (child.inst !== undefined) ProcessJson.loadQuestions(retval, child.inst, false);
    if (child.exercises !== undefined) {
      if (isRandom()) child.exercises = shuffle(child.exercises);
      ProcessJson.loadQuestions(retval, child.exercises, true);
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  inst(
    slide: SlideInterface,
    ctr: number,
    retval: SlideInterface[],
    parent: void
  ): SlideInterface[] {
    return new Array<SlideInterface>();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  exercises(
    slide: SlideInterface,
    ctr: number,
    retval: SlideInterface[],
    parent: void
  ): SlideInterface[] {
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
    questions.forEach((item) => {
      item.isExercise = isExercise;
      const lides = initSlide(item);
      if (Array.isArray(lides)) processedSlides.push(...lides);
      else processedSlides.push(lides);
    });
    slides.push(...processedSlides);
  }
  public static addNewInfoSlide(text: string, slides: SlideInterface[]) {
    const slide = INFO() as SlideInterface;
    slide.immediateConclusion = true;
    slide.txt = text;
    slides.push(slide);
  }
}
