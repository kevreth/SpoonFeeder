
import type { Course } from './course';
import type { SlideInterface } from './slideInterface';
import {Division} from './course'


export interface DivisionProcessor<C,D,T> {
  course_start(course: Division, retval: T): C;
  unit_start(unit: Division, ctr: number, retval: T, course: C): D;
  lesson_start(lesson: Division, ctr: number, retval: T, unit: D): D;
  module_start(module: Division, ctr: number, retval: T, lesson: D): D;
  inst(slide: SlideInterface, ctr: number, retval: T, module: D): T;
  exercises(slide: SlideInterface, ctr: number, retval: T, module: D): T;
  module_end(module: D, lesson: D): D;
  lesson_end(lesson: D, unit: D): D;
  unit_end(unit: D, course: C): D;
  course_end(course: C): C;
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
          retval = division.exercises(exercise, exercise_ctr, retval, _module);
        });
        module.inst.forEach((inst, inst_ctr) => {
          retval = division.exercises(inst, inst_ctr, retval, _module);
        });
        division.module_end(_module, _lesson);
      });
      division.lesson_end(_lesson, _unit);
    });
    division.unit_end(_unit, _course);
  });
  division.course_end(_course);
  return retval;
}
