import { doneButton } from '../../../quiz/buttons';
import { createHtmlMc } from '../mc/createHtmlMc';

export function createHtmlMa(question: string, options: string[]) {
  const mc = createHtmlMc(question, options);
  const accum = new Array<string>(mc);
  accum.push(`</div><br>\n${doneButton()}\n`);
  return accum.join('\n');
}
export type CreateHtmlTypeMa = (question: string, options: string[]) => string;
