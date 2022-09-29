import { Json } from '../globals';
export const ROW = '<tr><td>%Q%</td><td>%N%.</td><td>%A%</td><td>%C%</td></tr>';
export class Evaluation {
  constructor(
    public readonly responses: number,
    public readonly correct: number,
    public readonly text: string
  ) {}
  public static makeRow(question: string, response: string, answer: string) {
    let text = ROW;
    text = text.replace('%Q%', question);
    text = text.replace('%A%', response);
    text = text.replace('%C%', answer);
    return text;
  }
  public static evaluate(): string {
    const TABLE_HEADER =
      '<table><tr><th>Question</th><th></th><th>Your answer</th><th>Correct Answer</th></tr>';
    Json.reset();
    let text = TABLE_HEADER;
    let correctCtr = 0;
    let responseCtr = 0;
    for (let i = 0; i < Json.getNumSlides(); i++) {
      const slide = Json.getSlide();
      if (!slide.isExercise) continue;
      const evaluation: Evaluation = slide.evaluate();
      responseCtr += evaluation.responses;
      correctCtr += evaluation.correct;
      text = text.concat(evaluation.text);
    }
    text = text.concat('</table>');
    text = text.concat(Evaluation.summary(responseCtr, correctCtr));
    for (let i = 1; i < responseCtr + 1; i++) {
      text = text.replace('%N%', i.toString());
    }
    return text;
  }
  private static summary(responseCtr: number, correctCtr: number) {
    const pctCorrect = Evaluation.percentCorrect(correctCtr, responseCtr);
    return `NUMBER OF QUESTIONS: ${responseCtr}<br>\nNUMBER CORRECT: ${correctCtr}<br>\nPERCENT CORRECT: ${pctCorrect}%`;
  }
  private static percentCorrect(
    correctCtr: number,
    responseCtr: number
  ): string {
    return ((correctCtr / responseCtr) * 100).toFixed(0);
  }
}
