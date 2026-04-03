const ROW = '<tr class="%STATUS%"><td>%Q%</td><td class="sum-response">%A%</td><td class="sum-answer">%C%</td></tr>';
import type { AnswerType, SlideInterface } from './mediator';
import { SaveData } from './mediator';
export class Evaluation {
  constructor(
    public responses: number,
    public correct: number,
    public text: string
  ) {}
}
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
export function makeRow(
  question: string,
  response: AnswerType,
  answer: AnswerType,
  correct?: boolean
) {
  let text = ROW;
  const status = correct === true ? 'row-correct' : correct === false ? 'row-wrong' : 'row-unanswered';
  const listClass = Array.isArray(response) || Array.isArray(answer) ? ' row-list' : '';
  text = text.replace('%STATUS%', status + listClass);
  text = text.replace('%Q%', question);
  text = text.replace('%A%', response != null ? String(response) : '—');
  text = text.replace('%C%', answer != null ? String(answer) : '—');
  return text;
}
export function numbering(responseCtr: number, text: string) {
  for (let i = 1; i < responseCtr + 1; i++) {
    text = text.replace('%N%', i.toString());
  }
  return text;
}
export function evaluate(slidesArr: SlideInterface[]): string {
  const evals = getEvaluationArray(slidesArr);
  const TABLE_HEADER =
    '<table class="summary-table"><tr><th>Question</th><th>Your Answer</th><th>Correct Answer</th></tr>';
  const evalAccum = new Evaluation(0, 0, TABLE_HEADER);
  for (const evaluation of evals) {
    evalAccum.responses += evaluation.responses;
    evalAccum.correct += evaluation.correct;
    evalAccum.text = evalAccum.text.concat(evaluation.text);
  }
  evalAccum.text = evalAccum.text.concat('</table>');
  const txt0 = evalAccum.text;
  const correct = evalAccum.correct;
  const responses = evalAccum.responses;
  const txt1 = evalStats(correct, responses);
  return `<div class="summary-wrapper">${txt1}${txt0}</div>`;
}
function getEvaluationArray(slidesArr: SlideInterface[]) {
  const size = slidesArr.length;
  const evals = new Array<Evaluation>();
  for (let i = 0; i < size; i++) {
    const slide = slidesArr[i];
    if (slide && slide.isExercise) {
      const results = SaveData.getResults(slide);
      if (results !== '') slide.setResults(results);
      const evaluation: Evaluation = slide.evaluate();
      evals.push(evaluation);
    }
  }
  return evals;
}
export function evalStats(correct: number, responses: number) {
  const pctCorrect = percentCorrect(correct, responses);
  const wrong = responses - correct;
  return `<div class="summary-cards"><div class="summary-card card-score"><div class="card-value">${responses}</div><div class="card-label">Questions</div></div><div class="summary-card card-correct"><div class="card-value">${correct}</div><div class="card-label">Correct</div></div><div class="summary-card card-wrong"><div class="card-value">${wrong}</div><div class="card-label">Wrong</div></div><div class="summary-card card-score"><div class="card-value">${pctCorrect}%</div><div class="card-label">Score</div></div></div>`;
}
