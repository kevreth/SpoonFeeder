import { SlideInterface } from '../slideInterface';
import { adoc2html } from './adoc2html';

export function explanation(slide: SlideInterface):string {
  const txt = slide.txt;
  const answers = [];
  const distrators = [];
  const exp = adoc2html(slide.exp);
  const ref = adoc2html(slide.ref);
  const answer = pluralize('Answer', answers.length);
  const distrator = pluralize('Distractor', distrators.length);
  const retval = `
    ${txt}
    == ${answer}

    == ${distrator}

    == Explanation:
    ${exp}
    ${references(ref)}
  `
  return retval;
}
function pluralize(str: string, length: number): string {
  length > 1 ? str += 's' : undefined;
  return str;
}
function references(ref: string) {
  let retval = '';
  if(ref.length > 0) retval = `
    == Reference(s):
    ${ref}
  `
  return retval;
}
