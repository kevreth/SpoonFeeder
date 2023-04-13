import type { Course, Division } from './datalayer/courseData/course';
import type { DivisionProcessor } from './datalayer/courseData/courseFileProcessor';
import { process } from './datalayer/courseData/courseFileProcessor';
import { SaveData } from './datalayer/saveData/saveData';
import { initSlide } from './slide/slideFactory';
import { percentCorrect } from './evaluate';
import type { SlideInterface } from './slideInterface';
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
export class ScoreProcessor
  implements DivisionProcessor<ISummaryLine, ISummaryLine, ISummaryLine>
{
  public retval: ISummaryLine = new SummaryLine();
  course_start(division: Division, retval: SummaryLine): ISummaryLine {
    return this.module_start(division, 0, retval, new SummaryLine());
  }
  unit_start(
    division: Division,
    ctr: number,
    retval: SummaryLine,
    parent: ISummaryLine
  ): ISummaryLine {
    return this.module_start(division, ctr, retval, parent);
  }
  lesson_start(
    division: Division,
    ctr: number,
    retval: SummaryLine,
    parent: ISummaryLine
  ): ISummaryLine {
    return this.module_start(division, ctr, retval, parent);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  module_start(
    division: Division,
    ctr: number,
    retval: SummaryLine,
    parent: ISummaryLine
  ): ISummaryLine {
    const summary: ISummaryLine = new SummaryLine();
    summary.name = division.name;
    return summary;
  }
  inst(
    slide: SlideInterface,
    ctr: number,
    retval: SummaryLine,
    parent: ISummaryLine
  ): ISummaryLine {
    return parent;
  }
  exercises(
    slide: SlideInterface,
    ctr: number,
    retval: SummaryLine,
    parent: ISummaryLine
  ): ISummaryLine {
    const exerciseLine = Score.exercise(slide);
    parent.add(exerciseLine);
    return parent;
  }
  module_end(
    child: ISummaryLine,
    retval: SummaryLine,
    parent: ISummaryLine
  ): void {
    delete child['children'];
    this.unit_end(child, retval, parent);
  }
  lesson_end(
    child: ISummaryLine,
    retval: SummaryLine,
    parent: ISummaryLine
  ): void {
    this.unit_end(child, retval, parent);
  }
  unit_end(
    child: ISummaryLine,
    retval: SummaryLine,
    parent: ISummaryLine
  ): void {
    child.calculate();
    parent.add(child);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  course_end(course: ISummaryLine, retval: SummaryLine): void {
    course.calculate();
    this.retval = course;
  }
}
export class Score {
  public static summary2(_course: Course): ISummaryLine {
    const courseLine: ISummaryLine = new SummaryLine();
    const proc = new ScoreProcessor();
    process(_course, proc, courseLine);
    return proc.retval;
  }
  public static summary(_course: Course): Array<SummaryLine> {
    const courseLine: ISummaryLine = Score.summary2(_course);
    const courseLines = new Array<SummaryLine>();
    courseLines.push(courseLine);
    return courseLines;
  }
  //correlated SavedData with Exercises; not 1 to 1 in the case of vocab
  public static exercise(exercise: SlideInterface) {
    const slides = initSlide(exercise);
    const isArray = Array.isArray(slides);
    const exerciseLine = new SummaryLine();
    if (isArray) {
      slides.forEach((slide) => {
        createLine(slide, exerciseLine);
      });
    } else {
      createLine(slides, exerciseLine);
    }
    return exerciseLine;
  }
}
function createLine(slide: SlideInterface, exerciseLine: ISummaryLine) {
  const results = SaveData.getResults(slide);
  if (results !== '') {
    slide.setResults(results);
    const evaluation = slide.evaluate();
    exerciseLine.score += evaluation.correct;
    exerciseLine.complete += evaluation.responses;
  }
  exerciseLine.count += slide.getAnswerCount();
}
