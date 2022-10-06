import type { Course } from './course';
import type { SetValues } from './slide/setValues';
import { getInstance } from './slideFactory';
interface ISummaryLine {
  name: string;
  count: number;
  children?: Array<ISummaryLine>;
}
class SummaryLine implements ISummaryLine {
  name = '';
  count = 0;
  children?: ISummaryLine[] = new Array<SummaryLine>();
}
export class Score<T> {
  private _score = 0;
  private _questions = 0;
  public get questions(): number {
    return this._questions;
  }
  public addToQuestions(value: number): void {
    this._questions += value;
  }
  public addToScore(score: number): void {
    this._score += score;
  }
  public get score(): number {
    return this._score;
  }
  public getScore(sv: SetValues<T>): number {
    const result = sv.result();
    let count = 0;
    if (Array.isArray(result))
      count = result.filter((value) => value === true).length;
    else count = result ? 1 : 0;
    return count;
  }
  public static summary(_course: Course): SummaryLine {
    const courseLine: ISummaryLine = new SummaryLine();
    courseLine.name = _course.name;
    _course.units.forEach((unit) => {
      const unitLine: ISummaryLine = new SummaryLine();
      unitLine.name = unit.name;
      unit.lessons.forEach((lesson) => {
        const lessonLine: ISummaryLine = new SummaryLine();
        lessonLine.name = lesson.name;
        lesson.modules.forEach((module) => {
          const moduleLine: ISummaryLine = new SummaryLine();
          moduleLine.name = module.name;
          delete moduleLine['children'];
          module.exercises.forEach((exercise) => {
            const type = exercise.type;
            const slide = getInstance(type);
            slide.processJson(exercise);
            //necessary when we include scores
            // const slide2 = Json.getSlideByTxt(slide.txt as string);
            const exercise_count = slide.getAnswerCount();
            moduleLine.count += exercise_count;
          }); //exercise
          lessonLine.children?.push(moduleLine);
          lessonLine.count += moduleLine.count;
        }); //module
        unitLine.children?.push(lessonLine);
        unitLine.count += lessonLine.count;
      }); //lesson
      courseLine.children?.push(unitLine);
      courseLine.count += unitLine.count;
    }); //unit
    //course
    return courseLine;
  }
}
export interface GetScore {
  get score(): number;
  addToScore(value: number): void;
  get questions(): number;
  addToQuestions(value: number): void;
}
