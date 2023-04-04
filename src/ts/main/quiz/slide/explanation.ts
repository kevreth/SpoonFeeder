import type { SlideInterface } from '../slideInterface';
import type { AnswerType } from './strategies/resultStrategy';
export function explanation(slide: SlideInterface): string {
  const answers = slide.ans as AnswerType;
  const distrators = [];
  const exp = slide.exp as string;
  const ref = slide.ref as string;
  const answer = removeLinebreaks(pluralize('<b>Answer</b>', answers.length));
  const distrator = removeLinebreaks(pluralize('Distractor', distrators.length));
  const titleExplanation = title(exp, '<b>Explanation</b>');
  const titleReference = title(ref, '<br>Reference(s)');
  const titleDistractor = title(distrator, 'Distractor');
  const titleResponse = title(
    slide.res === undefined ? '' : slide.res.toString(),
    '<b>Response</b>'
  );
  const explanation = `
  <center><b>${slide.txt}</b></center> <br>
    ${answer}
    ${(slide.ans as string).toString()} <br>
    ${titleDistractor}
    ${titleResponse}
    ${removeLinebreaks((slide.res as string).toString())} <br>
    ${titleExplanation}
    ${exp === undefined ? '' : removeLinebreaks(exp)} <br>
    ${titleReference}
    ${removeLinebreaks(ref)}
  `;
  return explanation;
}
function removeLinebreaks(str: string): string {
  return str.replaceAll('<br>', '');
}
function pluralize(str: string, length: number): string {
  length >= 1 ? '== ' + (str += 's') : (str = '');
  return str;
}
function title(ref: string, label: string) {
  let retval = '';
  if (ref !== undefined && ref.length > 0) retval = label + ' <br>';
  return retval;
}
