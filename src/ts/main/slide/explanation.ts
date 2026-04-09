import type { AnswerType, SlideInterface } from './mediator';
export function explanation(slide: SlideInterface): string {
  const answers = slide.ans as AnswerType;
  const exp = slide.exp;
  const ref = slide.ref;
  const hasAnswer = removeLinebreaks(pluralize('<b>Answer</b>', answers.length)).length > 0;
  const hasExplanation = exp !== undefined && exp.length > 0;
  const hasReference = ref !== undefined && ref.length > 0;
  const hasResponse = title(
    slide.res === undefined ? '' : slide.res.toString(),
    '<b>Response</b>'
  ).length > 0;

  const titleHtml = `<center>${slide.txt}</center>`;

  const answerGrid = (hasAnswer || hasResponse) ? `<div class="answer-grid">
  <div class="info-cell">
    <div class="info-label">Correct Answer</div>
    <div class="info-value-correct">${(slide.ans as string).toString()}</div>
  </div>
  <div class="info-cell">
    <div class="info-label">Your Response</div>
    <div class="info-value-wrong">${removeLinebreaks((slide.res as string).toString())}</div>
  </div>
</div>` : '';

  const expHtml = hasExplanation ? `<div class="exp-box">
  <span class="section-label">Explanation</span>
  ${removeLinebreaks(exp)}
</div>` : '';

  const refHtml = hasReference ? `<div class="refs">
  <span class="section-label">References</span>
  ${removeLinebreaks(ref)}
</div>` : '';

  return `${titleHtml}${answerGrid}${expHtml}${refHtml}`;
}
function removeLinebreaks(str: string): string {
  return str.replaceAll('<br>', '');
}
function pluralize(str: string, length: number): string {
  return length >= 1 ? str + 's' : '';
}
function title(ref: string, label: string) {
  let retval = '';
  if (ref !== undefined && ref.length > 0) retval = label + ' <br>';
  return retval;
}
