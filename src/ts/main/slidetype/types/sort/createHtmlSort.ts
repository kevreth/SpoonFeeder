import { RANDOM, doneButton, shuffle } from '../../../quiz/mediator';
import type { AnswerType } from '../../../slide/mediator';

export function createHtmlSort(inst: string, ans: AnswerType) {
  const retval = inst + '<br>\n';
  const height = (ans as string[]).length * 90;
  let rev = `<div id="selection"></div>\n<section class="container" style="height:${height}px">\n`;
  let list = ans as string[];
  if (RANDOM.is()) list = shuffle(list as string[]);
  const dragIcon = '<span class="list-item-drag"><span></span><span></span><span></span></span>';
  list.forEach((item) => {
    rev = rev.concat(`  <div class="list-item">${dragIcon}<span style="padding-left:30px">${item}</span></div>\n`);
  });
  rev = rev.trimEnd();
  rev = rev.concat('\n</section>');
  return retval + rev + '\n</div>\n<div style="margin-top:40px">' + doneButton() + '</div>';
}
export type CreateHtmlTypeSort = (inst: string, ans: AnswerType) => string;
