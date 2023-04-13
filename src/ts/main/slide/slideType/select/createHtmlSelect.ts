import { doneButton } from '../../../quiz/buttons';

export function createHtmlSelect(instructions: string, txt: string[]) {
  const accum = new Array<string>(
    `${instructions}<span style="display: block; margin-bottom: .5em;"></span>\n<div id="text">\n`
  );
  txt.forEach((item, idx) => {
    accum.push(`<span id="w${idx + 1}">${item}</span> `);
  });
  accum.push(`</div><br>\n${doneButton()}\n`);
  return accum.join('\n');
}
