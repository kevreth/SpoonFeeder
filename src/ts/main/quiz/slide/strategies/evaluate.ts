import { makeRow } from '../../evaluate';
import { Evaluation } from '../../evaluate';
export type DefaultType = () => Evaluation;
export type SimpleType = (txt: string, res: string, ans: string, result: boolean) => Evaluation;
export type VocabType = (txt: string[], ans: string[], res: string[], result: Array<boolean>) => Evaluation;
export type GapType = (ans: string, res:string[], txt: string[], result: Array<boolean>) => Evaluation;
export type EvaluateType = SimpleType | VocabType | GapType;
export class Evaluate {
  static readonly DEFAULT: DefaultType = function evaluate() {
    return new Evaluation(0, 0, '');
  }
  //Used by IMAP, MC, SELECT, SORT
  static readonly SIMPLE: SimpleType = function evaluate(txt, res, ans, result) {
    let correctCtr = 0;
    const text = makeRow(txt, res, ans);
    if (result) correctCtr++;
    return new Evaluation(1, correctCtr, text);
  }
  static readonly VOCAB: VocabType = function evaluate(txt, ans, res, result) {
    const rows = new Array<string>();
    txt.forEach((txt1, idx) => {
      const ans1 = ans[idx];
      const res1 = res[idx];
      const row = makeRow(txt1, ans1, res1);
      rows.push(row);
    });
    const row_accum = rows.join('\n');
    const correctCtr = result.filter(Boolean).length;
    return new Evaluation(ans.length, correctCtr, row_accum);
  }
  static readonly GAP: GapType = function evaluate(txt, res, ans, result) {
    const rows = new Array<string>();
    const length = ans.length;
    for (let i = 0; i < length; i++) {
      const answer:string = ans[i];
      const response = res[i];
      const row = Evaluate.gapQuest(response, answer, i, answer, txt);
      rows.push(row);
    }
    const correctCtr = result.filter(Boolean).length;
    return new Evaluation(length, correctCtr, rows.join('\n'));
  }
  private static gapQuest(
    response: string,
    answer: string,
    i: number,
    ans: string,
    text: string
  ): string {
    let replaceValue = '';
    if (i === 0) replaceValue = `<td rowspan="${ans.length}">${text}</td>`;
    let row_a = makeRow(replaceValue, response, answer);
    row_a = row_a.replace(`<td>${replaceValue}</td>`, replaceValue);
    return row_a;
  }
}
