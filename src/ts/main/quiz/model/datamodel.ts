import { Course } from '../datalayer/course';
import type { ISummaryLine } from '../score';
import type { SlideInterface } from '../slideInterface';

export interface DataModel {
  model: Array<SlideInterface>;
  getSlide(txt: string): SlideInterface;
  processJson(course: Course): SlideInterface[];
  score(course: Course): ISummaryLine;
}
