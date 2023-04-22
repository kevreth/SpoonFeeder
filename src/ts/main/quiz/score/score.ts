import {
  AnswerType,
  Course,
  ISummaryLine,
  ScoreProcessor,
  SlideInterface,
  SummaryLine,
  initSlide, process,
} from '../mediator';
export class Score {
  private static summary2(_course: Course): ISummaryLine {
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
  public static exercise(
    exercise: SlideInterface,
    getResults: (slide: SlideInterface) => AnswerType
  ) {
    const slides = initSlide(exercise);
    const isArray = Array.isArray(slides);
    const exerciseLine = new SummaryLine();
    if (isArray)
      slides.forEach((slide) => Score.createLine(slide, exerciseLine, getResults));
    else Score.createLine(slides, exerciseLine, getResults);
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
