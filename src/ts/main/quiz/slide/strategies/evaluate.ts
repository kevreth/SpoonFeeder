import { makeRow } from '../../evaluate';
import { Evaluation } from '../../evaluate';
import { AnswerType, ResultReturnType } from './result';
export type DefaultType = () => Evaluation;
export type SimpleType = (txt: AnswerType, res: AnswerType, ans: AnswerType, result: ResultReturnType) => Evaluation;
export type VocabType = (txt: AnswerType, ans: AnswerType, res: AnswerType, result: ResultReturnType) => Evaluation;
export type GapType = (ans: AnswerType, res:AnswerType, txt: AnswerType, result: ResultReturnType) => Evaluation;
export type EvaluateType = SimpleType | VocabType | GapType;
export class Evaluate {
  static readonly DEFAULT: DefaultType = function evaluate() {
    return new Evaluation(0, 0, '');
  }
  //Used by IMAP, MC, SELECT, SORT
  static readonly SIMPLE: SimpleType = function evaluate(txt, res, ans, result) {
    let correctCtr = 0;
    const text = makeRow((txt as string), (res as string), (ans as string));
    if (result) correctCtr++;
    return new Evaluation(1, correctCtr, text);
  }
  static readonly VOCAB: VocabType = function evaluate(txt, ans, res, result) {
    const rows = new Array<string>();
    (txt as string[]).forEach((txt1, idx) => {
      const ans1 = ans[idx];
      const res1 = res[idx];
      const row = makeRow(txt1, (ans1 as string), (res1 as string));
      rows.push(row);
    });
    const row_accum = rows.join('\n');
    const correctCtr = (result as Array<boolean>).filter(Boolean).length;
    return new Evaluation(ans.length, correctCtr, row_accum);
  }
  static readonly GAP: GapType = function evaluate(ans, res, txt, result) {
    const rows = new Array<string>();
    const length = ans.length;
    for (let i = 0; i < length; i++) {
      const answer:string = (ans[i] as string);
      const response = (res[i] as string);
      const row = Evaluate.gapQuest(response, answer, i, ans, txt);
      rows.push(row);
    }
    const correctCtr = (result as Array<boolean>).filter(Boolean).length;
    return new Evaluation(length, correctCtr, rows.join('\n'));
  }
  private static gapQuest(
    response: AnswerType,
    answer: AnswerType,
    i: number,
    ans: AnswerType,
    text: AnswerType
  ): string {
    let replaceValue = '';
    if (i === 0) replaceValue = `<td rowspan="${ans.length}">${text}</td>`;
    let row_a = makeRow(replaceValue, (response as string), (answer as string));
    row_a = row_a.replace(`<td>${replaceValue}</td>`, replaceValue);
    return row_a;
  }
}
