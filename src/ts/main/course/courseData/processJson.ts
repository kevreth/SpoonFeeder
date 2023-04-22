import type {
  Course,
  Division,
  DivisionProcessor,
  Module,
  SlideInterface,
} from '../mediator';
import { INFO, RANDOM, initSlide, process, shuffle } from '../mediator';
class JsonProcessor
  implements DivisionProcessor<void, void, SlideInterface[]>
{
  private addNewInfoSlide(
    name: string,
    ctr: number,
    child: Division,
    retval: SlideInterface[]
  ) {
    const title = ProcessJson.titleSlideText(name, ctr, child.name);
    const slide = ProcessJson.addNewInfoSlide(title);
    retval.push(slide);
  }
  course_start(course: Division, retval: SlideInterface[]): void {
    const slide = ProcessJson.addNewInfoSlide(course.name);
    retval.push(slide);
  }
  unit_start(
    child: Division,
    ctr: number,
    retval: SlideInterface[],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _parent: void
  ): void {
    this.addNewInfoSlide('Unit', ctr, child, retval);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  lesson_start(
    child: Division,
    ctr: number,
    retval: SlideInterface[],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _parent: void
  ): void {
    this.addNewInfoSlide('Lesson', ctr, child, retval);
  }
  module_start(
    child: Module,
    ctr: number,
    retval: SlideInterface[],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _parent: void
  ): void {
    this.addNewInfoSlide('Module', ctr, child, retval);
    if (child.inst !== undefined)
      ProcessJson.loadQuestions(retval, child.inst, false);
    if (child.exercises !== undefined) {
      if (RANDOM.is()) child.exercises = shuffle(child.exercises);
      ProcessJson.loadQuestions(retval, child.exercises, true);
    }
  }
  inst(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _slide: SlideInterface,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _ctr: number,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _retval: SlideInterface[],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _parent: void
  ): SlideInterface[] {
    return new Array<SlideInterface>();
  }
  exercises(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _slide: SlideInterface,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _ctr: number,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _retval: SlideInterface[],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _parent: void
  ): SlideInterface[] {
    return new Array<SlideInterface>();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  module_end(_child: void, _retval: SlideInterface[], _parent: void): void {
    return;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  lesson_end(_child: void, _retval: SlideInterface[], _parent: void): void {
    return;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  unit_end(_child: void, _retval: SlideInterface[], _parent: void): void {
    return;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  course_end(_course: void, _retval: SlideInterface[]): void {
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
      processedSlides.push(...(Array.isArray(lides) ? lides : [lides]));
    });
    slides.push(...processedSlides);
  }
  public static addNewInfoSlide(text: string) {
    const slide = INFO() as SlideInterface;
    slide.immediateConclusion = true;
    slide.txt = text;
    return slide;
  }
}
