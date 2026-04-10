import type {
  Division,
  DivisionProcessor,
  Module,
  SlideInterface,
} from '../index';
import { shuffle } from 'lodash';
import { RANDOM } from '../../dataaccess/webstorage/webStorage';
import { INFO } from '../../slidetype/types/info/factoryInfo';
import { initSlide } from '../../slidetype/misc/slideFactory';

export class JsonProcessor
  implements DivisionProcessor<void, void, SlideInterface[]>
{
  private _addNewInfoSlide(
    name: string,
    ctr: number,
    child: Division,
    retval: SlideInterface[]
  ) {
    const title = _titleSlideText(name, ctr, child.name);
    const slide = _createTitleSlide(title);
    retval.push(slide);
  }
  course_start(course: Division, retval: SlideInterface[]): void {
    const slide = _createTitleSlide(course.name);
    retval.push(slide);
  }
  unit_start(
    child: Division,
    ctr: number,
    retval: SlideInterface[],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _parent: void
  ): void {
    this._addNewInfoSlide('Unit', ctr, child, retval);
  }
  lesson_start(
    child: Division,
    ctr: number,
    retval: SlideInterface[],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _parent: void
  ): void {
    this._addNewInfoSlide('Lesson', ctr, child, retval);
  }
  module_start(
    child: Module,
    ctr: number,
    retval: SlideInterface[],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _parent: void
  ): void {
    this._addNewInfoSlide('Module', ctr, child, retval);
    if (child.inst !== undefined)
      _loadQuestions(retval, child.inst, false);
    if (child.exercises !== undefined) {
      if (RANDOM.is()) child.exercises = shuffle(child.exercises);
      _loadQuestions(retval, child.exercises, true);
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

function _createTitleSlide(text: string): SlideInterface {
  const slide = INFO() as SlideInterface;
  slide.immediateConclusion = true;
  slide.txt = text;
  return slide;
}
function _titleSlideText(type: string, counter: number, name: string): string {
  counter++;
  return `${type} ${counter}:<br>${name}`;
}
function _loadQuestions(
  slides: Array<SlideInterface>,
  questions: Array<SlideInterface>,
  isExercise: boolean
): void {
  const processedSlides = new Array<SlideInterface>();
  questions.forEach((item) => _initSlide2(item, isExercise, processedSlides));
  slides.push(...processedSlides);
}
function _initSlide2(
  item: SlideInterface,
  isExercise: boolean,
  processedSlides: SlideInterface[]
) {
  item.isExercise = isExercise;
  const lides = initSlide(item);
  processedSlides.push(...(Array.isArray(lides) ? lides : [lides]));
}
