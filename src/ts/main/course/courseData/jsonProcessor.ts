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
  if (item.type === 'cluster') {
    _expandCluster(item, isExercise, processedSlides);
    return;
  }
  const lides = initSlide(item);
  processedSlides.push(...(Array.isArray(lides) ? lides : [lides]));
}

let _clusterCounter = 0;
// Case-study/trend item cluster: `item.set` holds ordinary slide-YAML blocks
// (any existing type), each optionally carrying `groupContext` (only
// specified when the shared scenario text changes — "trending") and
// `groupTag` (e.g. a CJMM step label). Unlike Vocab's getSlideSet(), which
// flattens and forgets, each child here is run back through the normal
// initSlide() machinery and the result is stamped with shared group
// metadata so sibling slides stay correlated (and their shared/evolving
// context is preserved) once spliced into the flat slide list.
function _expandCluster(
  item: SlideInterface,
  isExercise: boolean,
  processedSlides: SlideInterface[]
) {
  const groupId = `cluster-${_clusterCounter++}`;
  const children = item.set ?? [];
  const total = children.length;
  let context = item.txt ?? '';
  children.forEach((child, idx) => {
    child.isExercise = isExercise;
    context = child.groupContext || context;
    const tag = child.groupTag ?? '';
    const lides = initSlide(child);
    const slidesArr = Array.isArray(lides) ? lides : [lides];
    slidesArr.forEach((s) => {
      s.groupId = groupId;
      s.groupContext = context;
      s.groupTag = tag;
      s.groupIndex = idx + 1;
      s.groupTotal = total;
    });
    processedSlides.push(...slidesArr);
  });
}
