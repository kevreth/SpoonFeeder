import { Json } from '../../globals';
import type { SlideInterface } from '../slideInterface';
import { Evaluation, ROW } from './evaluate';
export function summary(
  responseCtr: number,
  correctCtr: number,
  pctCorrect: string
) {
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
export function numbering(responseCtr: number, text: string) {
  for (let i = 1; i < responseCtr + 1; i++) {
    text = text.replace('%N%', i.toString());
  }
  return text;
}
export function processSlide(slide: SlideInterface, evalAccum: Evaluation) {
  const evaluation: Evaluation = slide.evaluate();
  evalAccum.responses += evaluation.responses;
  evalAccum.correct += evaluation.correct;
  evalAccum.text = evalAccum.text.concat(evaluation.text);
}
export function evaluate(): string {
  const TABLE_HEADER =
    '<table><tr><th>Question</th><th></th><th>Your answer</th><th>Correct Answer</th></tr>';
  Json.reset();
  const evalAccum = new Evaluation(0, 0, TABLE_HEADER);
  for (let i = 0; i < Json.getNumSlides(); i++) {
    const slide = Json.getSlide();
    if (!slide.isExercise) continue;
    processSlide(slide, evalAccum);
  }
  let text = evalAccum.text.concat('</table>');
  const correct = evalAccum.correct;
  const responses = evalAccum.responses;
  const pctCorrect = percentCorrect(correct, responses);
  text = text.concat(summary(responses, correct, pctCorrect));
  text = numbering(responses, text);
  return text;
}
