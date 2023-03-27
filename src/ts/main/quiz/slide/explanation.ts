import { SlideInterface } from '../slideInterface';
export function explanation(slide: SlideInterface):string {
  const answers = slide.ans;
  const distrators = [];
  const exp = slide.exp;
  const ref = slide.ref;
  const answer = pluralize('Answer', answers.length);
  const distrator = pluralize('Distractor', distrators.length);
  const titleExplantion = title(exp, 'Explanation');
  const titleReference = title(ref, 'Reference');
  const titleDistractor = title(distrator, 'Distractor');
  const titleResponse = title(slide.res === undefined ? '' : slide.res.toString(), 'Response');
  const explanation = `
    <b>${slide.txt}</b> <br>
    ${answer} <br>
    ${slide.ans.toString()} <br>
    ${titleDistractor} <br>
    ${titleResponse} <br>
    ${slide.res.toString()} <br><br>
    ${titleExplantion}
    ${exp === undefined ? '' : exp}
    ${titleReference}(s):
    ${ref}
  `
  return explanation;
}
function pluralize(str: string, length: number): string {
  length >= 1 ? '== ' + (str += 's') : str ='';
  return str;
}
function title(ref: string, label: string) {
  let retval = '';
  if(ref !== undefined && ref.length > 0) retval = label;
  return retval;
}
