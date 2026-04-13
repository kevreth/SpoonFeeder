import { makeButton } from '../../../quiz/buttons';

export function createHtmlMc(question: string, options: string[]) {
  const accum = new Array<string>(
    `\n${question}<span style="display: block; margin-bottom: .5em;"></span>\n`
  );
  options.forEach((option, i) => {
    const cls = option.includes('<img') ? 'questionBtn imgBtn' : 'questionBtn';
    accum.push(makeButton('btn' + i, cls, option));
  });
  return accum.join('\n');
}
export type CreateHtmlTypeMc = (question: string, options: string[]) => string;
