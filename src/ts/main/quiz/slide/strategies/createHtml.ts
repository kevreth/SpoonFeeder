import { isRandom, makeButton, shuffle } from 'src/ts/main/utilities';
export type CreateHtmlTypeGap = (remaining: string, fills: string, gaps: string) => string;
export type CreateHtmlTypeInfo = (txt:string) => string;
export type CreateHtmlTypeImap = (inst: string, img: string) => string;
export type CreateHtmlTypeMc = (question: string, options: string[]) => string
export type CreateHtmlTypeSelect = (instructions: string, res: string[]) => string;
export type CreateHtmlTypeSort = (inst: string, ans: string[]) => string;
export type CreateHtmlTypeUnion = CreateHtmlTypeGap | CreateHtmlTypeImap | CreateHtmlTypeMc | CreateHtmlTypeSelect | CreateHtmlTypeSort;
export type CreateHtmlTypeIntersection = CreateHtmlTypeGap & CreateHtmlTypeImap & CreateHtmlTypeMc & CreateHtmlTypeSelect & CreateHtmlTypeSort;

export class CreateHtml {
  static readonly DEFAULT = function() {return '';}
  static readonly INFO: CreateHtmlTypeInfo = function(txt:string) {
    return `\n${txt}`;
  }
  static readonly GAP: CreateHtmlTypeGap = function(remaining, fills, gaps) {
    const html = `\n<div id="fills">${fills}\n</div>` +
      `\n<div id="gaps">${gaps}\n</div>` +
      `\n<div id="remaining">${remaining}</div>` +
      '\n<div id="response"></div>';
    return html;
  }
  static readonly IMAP: CreateHtmlTypeImap = function(inst: string, img: string) {
    return `${inst}<br><div id="imagemap" data-src="${img}"></div>`;
  }
  static readonly MC: CreateHtmlTypeMc = function(question: string, options: string[]) {
    const accum = new Array<string>(
      `\n${question}<span style="display: block; margin-bottom: .5em;"></span>\n`
    );
    options.forEach((option, i) => {
      accum.push(makeButton('btn' + i, 'questionBtn', option) + '<br/>\n');
    });
    return accum.join('\n');
  }
  static readonly SELECT: CreateHtmlTypeSelect =  function (instructions, res) {
    const accum = new Array<string>(
      `${instructions}<span style="display: block; margin-bottom: .5em;"></span>\n<div id="text">\n`
    );
    res.forEach((item, idx) => {
      accum.push(`<span id="w${idx + 1}">${item}</span> `);
    });
    const button = makeButton('btn', 'done', 'done');
    accum.push(`</div><br>\n${button}\n`);
    return accum.join('\n');
  }
  static readonly SORT: CreateHtmlTypeSort =  function createHtml(inst, ans) {
    const retval = inst + '<br>\n';
    let rev = '<div id="selection"></div>\n<section class="container">\n';
    let list = ans;
    /////////  for testing
    if (isRandom()) list = shuffle(list);
    else list = ['b', 'a', 'c', 'd'];
    //////////////////////////////////
    list.forEach((item) => {
      rev = rev.concat(`  <div class="list-item">${item}</div>\n`);
    });
    rev = rev.trimEnd();
    rev = rev.concat('\n</section>');
    return retval + rev + '\n</div><br>\n' + makeButton('btn', 'done', 'done');
  }
}
