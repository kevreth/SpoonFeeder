import type { Course, SlideInterface } from '../index';
import { process } from '../courseFileProcessor';
import { JsonProcessor } from './jsonProcessor';
export class ProcessJson {
  public static processJson(course: Course) {
    return process(course, new JsonProcessor(), new Array<SlideInterface>());
  }
}
