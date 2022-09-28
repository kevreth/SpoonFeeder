import { Globals, ROW } from '../globals';
export class Evaluation {
  constructor(
    public readonly responses: number,
    public readonly correct: number,
    public readonly text: string
  ) {}
}
export function evaluate(): string {
  const TABLE_HEADER =
    '<table><tr><th>Question</th><th></th><th>Your answer</th><th>Correct Answer</th></tr>';
  Globals.JSON.reset();
  let text = TABLE_HEADER;
  let correctCtr = 0;
  let responseCtr = 0;
  for (let i = 0; i < Globals.JSON.getNumSlides(); i++) {
    const slide = Globals.JSON.getSlide();
    if (!slide.isExercise) continue;
    const evaluation: Evaluation = slide.evaluate();
    responseCtr += evaluation.responses;
    correctCtr += evaluation.correct;
    text = text.concat(evaluation.text);
  }
  text = text.concat('</table>');
  text = text.concat(summary(responseCtr, correctCtr));
  for (let i = 1; i < responseCtr + 1; i++) {
    text = text.replace('%N%', i.toString());
  }
  return text;
}
function summary(responseCtr: number, correctCtr: number) {
  const pctCorrect = percentCorrect(correctCtr, responseCtr);
  return `NUMBER OF QUESTIONS: ${responseCtr}<br>\nNUMBER CORRECT: ${correctCtr}<br>\nPERCENT CORRECT: ${pctCorrect}%`;
}
export function percentCorrect(
  correctCtr: number,
  responseCtr: number
): string {
  return ((correctCtr / responseCtr) * 100).toFixed(0);
}
export function makeRow(question: string, response: string, answer: string) {
  let text = ROW;
  text = text.replace('%Q%', question);
  text = text.replace('%A%', response);
  text = text.replace('%C%', answer);
  return text;
}
