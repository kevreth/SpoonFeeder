import type { SlideInterface } from '../slideInterface';
import type { AnswerType } from './strategies/resultStrategy';
export function explanation(slide: SlideInterface): string {
  const answers = slide.ans as AnswerType;
  const distrators = [];
  const exp = slide.exp as string;
  const ref = slide.ref as string;
  const answer = pluralize('Answer', answers.length);
  const distrator = pluralize('Distractor', distrators.length);
  const titleExplantion = title(exp, 'Explanation');
  const titleReference = title(ref, 'Reference');
  const titleDistractor = title(distrator, 'Distractor');
  const titleResponse = title(
    slide.res === undefined ? '' : slide.res.toString(),
    'Response'
  );
  const explanation = `
  <center><b>${slide.txt}</b></center> <br>
    <b>${answer}</b> <br>
    ${(slide.ans as string).toString()} <br>
    ${titleDistractor}  <br>
    <b>${titleResponse}</b> <br>
    ${(slide.res as string).toString()} <br><br>
    <b>${titleExplantion}</b>
    ${exp === undefined ? '' : exp}
    ${titleReference}(s):
    ${ref}
  `;
  return explanation;
}
function pluralize(str: string, length: number): string {
  length >= 1 ? '== ' + (str += 's') : (str = '');
  return str;
}
function title(ref: string, label: string) {
  let retval = '';
  if (ref !== undefined && ref.length > 0) retval = label;
  return retval;
}
