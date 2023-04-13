import { shuffle } from '../../quiz/utilities';
import { isRandom } from '../../datalayer/mediator';
import { doneButton, makeButton } from '../../quiz/buttons';
import type { AnswerType } from './resultStrategy';
export type CreateHtmlTypeGap = (
  remaining: string,
  fills: string,
  gaps: string
) => string;
export type CreateHtmlTypeInfo = (txt: string) => string;
export type CreateHtmlTypeImap = (inst: string, img: string) => string;
export type CreateHtmlTypeMa = (question: string, options: string[]) => string;
export type CreateHtmlTypeMc = (question: string, options: string[]) => string;
export type CreateHtmlTypeSelect = (
  instructions: string,
  txt: string[]
) => string;
export type CreateHtmlTypeSort = (inst: string, ans: AnswerType) => string;
export type CreateHtmlTypeUnion =
  | CreateHtmlTypeGap
  | CreateHtmlTypeImap
  | CreateHtmlTypeMa
  | CreateHtmlTypeMc
  | CreateHtmlTypeSelect
  | CreateHtmlTypeSort;
export type CreateHtmlTypeIntersection =
  CreateHtmlTypeGap &
  CreateHtmlTypeImap &
  CreateHtmlTypeMa &
  CreateHtmlTypeMc &
  CreateHtmlTypeSelect &
  CreateHtmlTypeSort;
export interface CreateHtmlI {
  createHtml: CreateHtmlTypeUnion;
}
export class CreateHtmlGap implements CreateHtmlI {
    createHtml: CreateHtmlTypeGap = (remaining, fills, gaps) => {
    const html =
      `\n<div id="fills">${fills}\n</div>` +
      `\n<div id="gaps">${gaps}\n</div>` +
      `\n<div id="remaining">${remaining}</div>` +
      '\n<div id="response"></div>';
    return html;
  };
}
export class CreateHtml {
    static readonly INFO: CreateHtmlTypeInfo = createHtmlInfo;
    static readonly GAP: CreateHtmlTypeGap = createHtmlGap;
    static readonly IMAP: CreateHtmlTypeImap = createHtmlImap;
    static readonly MA: CreateHtmlTypeMa = createHtmlMa;
    static readonly MC: CreateHtmlTypeMc = createHtmlMc;
    static readonly SELECT: CreateHtmlTypeSelect = createHtmlSelect;
    static readonly SORT: CreateHtmlTypeSort = createHtmlSort;
}
function createHtmlSort(inst: string, ans: AnswerType) {
  const retval = inst + '<br>\n';
  let rev = '<div id="selection"></div>\n<section class="container">\n';
  let list = ans as string[];
  if (isRandom())
    list = shuffle(list as string[]);
  list.forEach((item) => {
    rev = rev.concat(`  <div class="list-item">${item}</div>\n`);
  });
  rev = rev.trimEnd();
  rev = rev.concat('\n</section>');
  return retval + rev + '\n</div><br>\n' + doneButton();
}

function createHtmlSelect(instructions: string, txt: string[]) {
  const accum = new Array<string>(
    `${instructions}<span style="display: block; margin-bottom: .5em;"></span>\n<div id="text">\n`
  );
  txt.forEach((item, idx) => {
    accum.push(`<span id="w${idx + 1}">${item}</span> `);
  });
  accum.push(`</div><br>\n${doneButton()}\n`);
  return accum.join('\n');
}

function createHtmlMc(question: string, options: string[]) {
  const accum = new Array<string>(
    `\n${question}<span style="display: block; margin-bottom: .5em;"></span>\n`
  );
  options.forEach((option, i) => {
    accum.push(makeButton('btn' + i, 'questionBtn', option) + '<br/>\n');
  });
  return accum.join('\n');
}

function createHtmlMa(question: string, options: string[]) {
  const mc = CreateHtml.MC(question, options);
  const accum = new Array<string>(mc);
  accum.push(`</div><br>\n${doneButton()}\n`);
  return accum.join('\n');
}

function createHtmlImap(inst: string, img: string): string {
  return `${inst}<br><div id="imagemap" data-src="${img}"></div>`;
}

function createHtmlGap(remaining: string, fills: string, gaps: string) {
  const html = `\n<div id="fills">${fills}\n</div>` +
    `\n<div id="gaps">${gaps}\n</div>` +
    `\n<div id="remaining">${remaining}</div>` +
    '\n<div id="response"></div>';
  return html;
}

function createHtmlInfo(txt: string): string {
  return `\n${txt}`;
}

