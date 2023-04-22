import { ISummaryLine, ScoreProcessor, SummaryLine } from '../../quiz/mediator';
import {
  AnswerType,
  Course,
  SlideInterface,
  process,
} from '../mediator';
export class Score {
  private static getSummaryLine(_course: Course): ISummaryLine {
    const courseLine: ISummaryLine = new SummaryLine();
    const proc = new ScoreProcessor();
    process(_course, proc, courseLine);
    return proc.retval;
  }
  public static summary(_course: Course): Array<SummaryLine> {
    const courseLine: ISummaryLine = Score.getSummaryLine(_course);
    const courseLines = new Array<SummaryLine>();
    courseLines.push(courseLine);
    return courseLines;
  }
  //correlated SavedData with Exercises; not 1 to 1 in the case of vocab
  public static exercise(
    exercise: SlideInterface,
    getResults: ( slide: SlideInterface ) => AnswerType,
    initSlide: ( exercise: SlideInterface ) => SlideInterface | SlideInterface[],
    createLine: (slide: SlideInterface, exerciseLine: ISummaryLine, getResults: (slide: SlideInterface) => AnswerType) => void
  ) {
    const slides = initSlide(exercise);
    const isArray = Array.isArray(slides);
    const exerciseLine = new SummaryLine();
    if (isArray)
      slides.forEach((slide) =>
        createLine(slide, exerciseLine, getResults)
      );
    else createLine(slides, exerciseLine, getResults);
    return exerciseLine;
  }
}
