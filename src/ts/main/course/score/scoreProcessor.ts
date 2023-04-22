import type { SlideInterface } from '../../dataaccess/mediator';
import {
  AnswerType,
  Division,
  initSlide,
  ISummaryLine,
  SaveData,
  Score,
  SummaryLine,
} from '../../quiz/mediator';
import { DivisionProcessor } from '../mediator';
export class ScoreProcessor
  implements DivisionProcessor<ISummaryLine, ISummaryLine, ISummaryLine>
{
  public retval: ISummaryLine = new SummaryLine(); //DI candidate
  private getResults = SaveData.getResults; //DI candidate
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
  module_start(
    division: Division,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _ctr: number,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _retval: SummaryLine,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _parent: ISummaryLine
  ): ISummaryLine {
    const summary: ISummaryLine = new SummaryLine();
    summary.name = division.name;
    return summary;
  }
  inst(
    _slide: SlideInterface,
    _ctr: number,
    _retval: SummaryLine,
    parent: ISummaryLine
  ): ISummaryLine {
    return parent;
  }
  exercises(
    slide: SlideInterface,
    _ctr: number,
    _retval: SummaryLine,
    parent: ISummaryLine
  ): ISummaryLine {
    const exerciseLine = Score.exercise(slide, this.getResults, initSlide, ScoreProcessor.createLine);
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
    _retval: SummaryLine,
    parent: ISummaryLine
  ): void {
    child.calculate();
    parent.add(child);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  course_end(course: ISummaryLine, _retval: SummaryLine): void {
    course.calculate();
    this.retval = course;
  }
  private static createLine(
    slide: SlideInterface,
    exerciseLine: ISummaryLine,
    getResults: (slide: SlideInterface) => AnswerType
  ) {
    const results = getResults(slide);
    if (results !== '') {
      slide.setResults(results);
      const evaluation = slide.evaluate();
      exerciseLine.score += evaluation.correct;
      exerciseLine.complete += evaluation.responses;
      exerciseLine.count += slide.getAnswerCount();
    }
  }
}
