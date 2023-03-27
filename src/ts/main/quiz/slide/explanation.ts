import { SlideInterface } from '../slideInterface';

export function explanation(slide: SlideInterface):string {
  const txt = slide.txt;
  const answers = slide.ans;
  const distrators = [];
  const exp = slide.exp;
  const ref = slide.ref;
  const answer = pluralize('Answer', answers.length);
  const distrator = pluralize('Distractor', distrators.length);
  const retval = `
    = ${txt}

    == ${answer}

    ${slide.ans}

    ${references(distrator, 'Explanation')}

    ${references(slide.res === undefined ? '' : slide.res.toString(), 'Response')}

    ${references(exp, 'Explanation')}

    ${references(ref, 'Reference')}
  `
  return retval;
}
function pluralize(str: string, length: number): string {
  length >= 1 ? '== ' + (str += 's') : str ='';
  return str;
}
function references(ref: string, label: string) {
  let retval = '';
  if(ref !== undefined && ref.length > 0) retval = `
    == ${label}(s):
    ${ref}
  `
  return retval;
}
