import { RANDOM, doneButton, shuffle } from '../../../quiz/mediator';
import type { AnswerType } from '../../../slide/mediator';

export function createHtmlSort(inst: string, ans: AnswerType) {
  const retval = inst + '<br>\n';
  let rev = '<div id="selection"></div>\n<section class="container">\n';
  let list = ans as string[];
  if (RANDOM.is()) list = shuffle(list as string[]);
  list.forEach((item) => {
    rev = rev.concat(`  <div class="list-item">${item}</div>\n`);
  });
  rev = rev.trimEnd();
  rev = rev.concat('\n</section>');
  return retval + rev + '\n</div><br>\n' + doneButton();
}
export type CreateHtmlTypeSort = (inst: string, ans: AnswerType) => string;
