import { makeButton } from '../../../quiz/mediator';

export function createHtmlMc(question: string, options: string[]) {
  const accum = new Array<string>(
    `\n${question}<span style="display: block; margin-bottom: .5em;"></span>\n`
  );
  options.forEach((option, i) => {
    accum.push(makeButton('btn' + i, 'questionBtn', option) + '<br/>\n');
  });
  return accum.join('\n');
}
export type CreateHtmlTypeMc = (question: string, options: string[]) => string;
