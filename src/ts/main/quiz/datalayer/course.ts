import type { SlideInterfaceProperties } from '../slideInterface';
export abstract class Division {
  name = '';
}
export class Course extends Division {
  units: Array<Unit> = [];
}
export class Unit extends Division {
  lessons: Array<Lesson> = [];
}
export class Lesson extends Division {
  modules: Array<Module> = [];
}
export class Module extends Division {
  inst: Array<SlideInterfaceProperties> = [];
  exercises: Array<SlideInterfaceProperties> = [];
}