import { isEqual } from '../utilities';
import type { Course } from './course';
import { SaveData } from './slide/saveData';
import { getInstance } from './slideFactory';
import type { SlideInterface } from './slideInterface';
const { get: getSavedDataArray } = SaveData;
interface ISummaryLine {
  name: string;
  count: number;
  score: number;
  children?: Array<ISummaryLine>;
  add(child: ISummaryLine): void;
}
class SummaryLine implements ISummaryLine {
  add(child: ISummaryLine): void {
    this.count += child.count;
    this.score += child.score;
    this.children?.push(child);
  }
  name = '';
  count = 0;
  score = 0;
  children?: ISummaryLine[] = new Array<SummaryLine>();
}
export class Score {
  public static getScore(slide: SlideInterface): number {
    const result = slide.result();
    let count = 0;
    if (Array.isArray(result))
      count = result.filter((value) => value === true).length;
    else count = result ? 1 : 0;
    return count;
  }
  //Cannot handle Vocab, which is skipped
  public static summary(_course: Course): Array<SummaryLine> {
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
            const exercise_count = slide.getAnswerCount();
            moduleLine.count += exercise_count;
            //refactoring opporunity for duplicate code with makeSlides
            const arr = getSavedDataArray();
            //conditional necessary because Vocab returns null
            if (slide) {
              const idx = arr.findIndex((x) => isEqual(x.txt, slide.txt));
              const slide2 = arr[idx];
              //conditional necessary because of iterative behavior not
              //understood. the else executes multiple times per exercise.
              //However it has no functional effect. Still works.
              if (slide2) {
                slide.setResults(slide2.result);
                moduleLine.score += slide.evaluate().correct;
              } else console.log(slide.txt);
            }
          }); //exercise
          lessonLine.add(moduleLine);
        }); //module
        unitLine.add(lessonLine);
      }); //lesson
      courseLine.add(unitLine);
    }); //unit
    //course
    const courseLines = new Array<SummaryLine>();
    courseLines.push(courseLine);
    return courseLines;
  }
}
export interface GetScore {
  get score(): number;
  addToScore(value: number): void;
  get questions(): number;
  addToQuestions(value: number): void;
}
