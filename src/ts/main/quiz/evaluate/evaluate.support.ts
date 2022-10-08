import { Queue } from 'mnemonist';
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
  if (responseCtr === 0) return '0'; // prevent divide-by-zero error
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
export function evaluate(slides: SlideInterface[]): string {
  const evalAccum = evalBody(slides);
  const txt0 = evalAccum.text;
  const correct = evalAccum.correct;
  const responses = evalAccum.responses;
  const txt1 = evalStats(correct, responses);
  return txt0.concat(txt1);
}
export function evalBody(slidesArr: SlideInterface[]) {
  const TABLE_HEADER =
    '<table><tr><th>Question</th><th></th><th>Your answer</th><th>Correct Answer</th></tr>';
  const evalAccum = new Evaluation(0, 0, TABLE_HEADER);
  const slides = Queue.from(slidesArr);
  const size = slides.size;
  for (let i = 0; i < size; i++) {
    const slide = slides.dequeue();
    if (slide && slide.isExercise) processSlide(slide, evalAccum);
  }
  evalAccum.text = numbering(evalAccum.responses, evalAccum.text);
  evalAccum.text = evalAccum.text.concat('</table>');
  return evalAccum;
}
export function evalStats(correct: number, responses: number) {
  const pctCorrect = percentCorrect(correct, responses);
  const txt = summary(responses, correct, pctCorrect);
  return txt;
}
