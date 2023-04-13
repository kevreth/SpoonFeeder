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
    //                             DEFAULT
    static readonly DEFAULT = function () {
    return '';
  };
    //                             INFO
    static readonly INFO: CreateHtmlTypeInfo = function (txt: string) {
    return createHtmlInfo(txt);
  };
    //                             GAP
    static readonly GAP: CreateHtmlTypeGap = function (remaining, fills, gaps) {
    return createHtmlGap(fills, gaps, remaining);
  };
    //                             IMAP
    static readonly IMAP: CreateHtmlTypeImap = function (
    inst: string,
    img: string
  ) {
    return createHtmlImap(inst, img);
  };
    //                             MA
    static readonly MA: CreateHtmlTypeMa = function (
    question: string,
    options: string[]
  ) {
    return createHtmlMa(question, options);
  };
    //                             MC
    // also used by BOOL, MA, VOCAB
  static readonly MC: CreateHtmlTypeMc = function (
    question: string,
    options: string[]
  ) {
    return createHtmlMc(question, options);
  };
    //                             SELECT
    static readonly SELECT: CreateHtmlTypeSelect = function (instructions, txt) {
    return createHtmlSelect(instructions, txt);
  };
    //                             SORT
    static readonly SORT: CreateHtmlTypeSort = function createHtml(inst, ans) {
    return createHtmlSort(inst, ans);
  };
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

function createHtmlGap(fills: string, gaps: string, remaining: string) {
  const html = `\n<div id="fills">${fills}\n</div>` +
    `\n<div id="gaps">${gaps}\n</div>` +
    `\n<div id="remaining">${remaining}</div>` +
    '\n<div id="response"></div>';
  return html;
}

function createHtmlInfo(txt: string): string {
  return `\n${txt}`;
}

