import { isEqual } from '../utilities';
import { Course, Division } from './course';
import {DivisionProcessor, process} from './dataManager'
import { percentCorrect } from './evaluate';
import { SaveData } from './slide/saveData';
import { initSlide } from './slideFactory';
import type { SlideInterface } from './slideInterface';
const { get: getSavedDataArray } = SaveData;
export interface ISummaryLine {
  name: string;
  score: number;
  complete: number;
  pctCorrect: string;
  count: number;
  pctComplete: string;
  children?: Array<ISummaryLine>;
  add(child: ISummaryLine): void;
  calculate(): void;
}

export class SummaryLine implements ISummaryLine {
  name = '';
  score = 0;
  complete = 0;
  pctCorrect = '';
  count = 0;
  pctComplete = '';
  children?: ISummaryLine[] = new Array<SummaryLine>();
  add(child: ISummaryLine): void {
    this.score += child.score;
    this.complete += child.complete;
    this.count += child.count;
    this.calculate();
    this.children?.push(child);
  }
  calculate(): void {
    this.pctComplete = percentCorrect(this.complete, this.count) + '%';
    this.pctCorrect = percentCorrect(this.score, this.complete) + '%';
  }
}
export class ScoreProcessor implements DivisionProcessor<ISummaryLine,ISummaryLine, ISummaryLine> {
  course_start(division: Division, retval: SummaryLine): ISummaryLine {
    return this.module_start(division, 0, retval, new SummaryLine());
  }
  unit_start(division: Division, ctr: number, retval: SummaryLine, parent: ISummaryLine): ISummaryLine {
    return this.module_start(division, ctr, retval, parent);
  }
  lesson_start(division: Division, ctr: number, retval: SummaryLine, parent: ISummaryLine): ISummaryLine {
    return this.module_start(division, ctr, retval, parent);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  module_start(division: Division, ctr: number, retval: SummaryLine, parent: ISummaryLine): ISummaryLine {
    const summary: ISummaryLine = new SummaryLine();
    summary.name = division.name;
    return summary;
  }
  inst(slide: SlideInterface, ctr: number, retval: SummaryLine, parent: ISummaryLine): ISummaryLine {
    return parent;
  }
  exercises(slide: SlideInterface, ctr: number, retval: SummaryLine, parent: ISummaryLine): ISummaryLine {
    const exerciseLine = Score.exercise(slide, getSavedDataArray());
    parent.add(exerciseLine);
    return parent;
  }
  module_end(child: ISummaryLine, parent: ISummaryLine): void {
    delete child['children'];
    this.unit_end(child, parent);
  }
  lesson_end(child: ISummaryLine, parent: ISummaryLine): void {
    this.unit_end(child, parent);
  }
  unit_end(child: ISummaryLine, parent: ISummaryLine): void {
    child.calculate();
    parent.add(child);
  }
  course_end(course: ISummaryLine): void {
    course.calculate();
  }

}
export class Score {
  // public static summary(_course: Course): Array<SummaryLine> {
  //   const courseLine = process(_course, new ScoreProcessor(), Array<SummaryLine>);
  //   const courseLines = new Array<SummaryLine>();
  //   courseLines.push(courseLine);
  //   return courseLines;
  // }
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
            const exerciseLine = Score.exercise(exercise, getSavedDataArray());
            moduleLine.add(exerciseLine);
          }); //exercise
          moduleLine.calculate();
          lessonLine.add(moduleLine);
        }); //module
        lessonLine.calculate();
        unitLine.add(lessonLine);
      }); //lesson
      unitLine.calculate();
      courseLine.add(unitLine);
    }); //unit
    //course
    courseLine.calculate();
    const courseLines = new Array<SummaryLine>();
    courseLines.push(courseLine);
    return courseLines;
  }
  //correlated SavedData with Exercises; not 1 to 1 in the case of vocab
  public static exercise(
    exercise: SlideInterface,
    saves: SaveData[]
  ) {
    const slides = initSlide(exercise);
    const isArray = Array.isArray(slides);
    const exerciseLine = new SummaryLine();
    if (isArray) {
      slides.forEach((slide) => {
        createLine(saves, slide, exerciseLine);
      });
    } else {
      createLine(saves, slides, exerciseLine);
    }
    return exerciseLine;
  }
}
function createLine(
  saves: SaveData[],
  slide: SlideInterface,
  exerciseLine: ISummaryLine
) {
  const idx = saves.findIndex((x) => isEqual(x.txt, slide.txt as string));
  if (idx > -1) {
    const results = saves[idx].result;
    slide.setResults(results);
    const evaluation = slide.evaluate();
    exerciseLine.score += evaluation.correct;
    exerciseLine.complete += evaluation.responses;
  }
  exerciseLine.count += slide.getAnswerCount();
}
