import type { Course } from './course';
import type { SlideInterface } from '../slideInterface';
import {Division} from './course'
export interface DivisionProcessor<C,D,T> {
  course_start(course: Division, retval: T): C;
  unit_start(child: Division, ctr: number, retval: T, parent: C): D;
  lesson_start(child: Division, ctr: number, retval: T, parent: D): D;
  module_start(child: Division, ctr: number, retval: T, parent: D): D;
  inst(slide: SlideInterface, ctr: number, retval: T, parent: D): T;
  exercises(slide: SlideInterface, ctr: number, retval: T, parent: D): T;
  module_end(child: D, retval: T, parent: D): void;
  lesson_end(child: D, retval: T, parent: D): void;
  unit_end(child: D, retval: T, parent: C): void;
  course_end(course: C, retval: T): void;
}
export function process<C,D,T>(courseData: Course, division: DivisionProcessor<C,D,T>, retval: T) {
  const _course: C = division.course_start(courseData, retval);
  courseData.units.forEach((unit, unit_ctr) => {
    const _unit: D = division.unit_start(unit, unit_ctr, retval, _course);
    unit.lessons.forEach((lesson, lesson_ctr) => {
      const _lesson: D = division.lesson_start(lesson, lesson_ctr, retval, _unit);
      lesson.modules.forEach((module, module_ctr) => {
        const _module: D = division.module_start(module, module_ctr, retval, _lesson);
        module.exercises.forEach((exercise, exercise_ctr) => {
          division.exercises(exercise, exercise_ctr, retval, _module);
        });
        module.inst.forEach((inst, inst_ctr) => {
          division.inst(inst, inst_ctr, retval, _module);
        });
        division.module_end(_module, retval, _lesson);
      });
      division.lesson_end(_lesson, retval, _unit);
    });
    division.unit_end(_unit, retval, _course);
  });
  division.course_end(_course, retval);
  return retval;
}
