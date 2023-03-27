import { SlideInterface } from '../slideInterface';

export function explanation(slide: SlideInterface):string {
  const txt = slide.txt;
  const answers = [];
  const distrators = [];
  const exp = slide.exp;
  const ref = slide.ref;
  const answer = pluralize('Answer', answers.length);
  const distrator = pluralize('Distractor', distrators.length);
  const retval = `
    = ${txt}

    == ${answer}

    ${distrator}

    == Explanation:
    ${exp}
    ${references(ref)}
  `
  return retval;
}
function pluralize(str: string, length: number): string {
  length >= 1 ? '== ' + (str += 's') : str ='';
  return str;
}
function references(ref: string) {
  let retval = '';
  if(ref !== undefined && ref.length > 0) retval = `
    == Reference(s):
    ${ref}
  `
  return retval;
}
