import { doneButton } from '../../../quiz/buttons';
import { CreateHtml } from '../../strategies/createHtmlStrategy';

export function createHtmlMa(question: string, options: string[]) {
  const mc = CreateHtml.MC(question, options);
  const accum = new Array<string>(mc);
  accum.push(`</div><br>\n${doneButton()}\n`);
  return accum.join('\n');
}
