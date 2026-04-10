import type {
  AnswerType,
  Division,
  DivisionProcessor,
  ISummaryLine,
  SlideInterface,
} from '../index';
import { SaveData } from '../../dataaccess/saveData/saveData';
import { SummaryLine } from './summaryLine';
import { initSlide } from '../../slidetype/misc/slideFactory';
import { percentCorrect } from '../../quiz/evaluate';
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
    const exerciseLine = ScoreProcessor.exercise(
      slide,
      this.getResults,
      initSlide,
      ScoreProcessor.createLine
    );
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
    child.calculate(percentCorrect);
    parent.add(child);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  course_end(course: ISummaryLine, _retval: SummaryLine): void {
    course.calculate(percentCorrect);
    this.retval = course;
  }
  //Moved from Score class to break score <-> scoreProcessor cycle
  public static exercise(
    exercise: SlideInterface,
    getResults: (slide: SlideInterface) => AnswerType,
    initSlide: (exercise: SlideInterface) => SlideInterface | SlideInterface[],
    createLine: (
      slide: SlideInterface,
      exerciseLine: ISummaryLine,
      getResults: (slide: SlideInterface) => AnswerType
    ) => void
  ) {
    const slides = initSlide(exercise);
    const isArray = Array.isArray(slides);
    const exerciseLine = new SummaryLine();
    if (isArray)
      slides.forEach((slide) => createLine(slide, exerciseLine, getResults));
    else createLine(slides, exerciseLine, getResults);
    return exerciseLine;
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
