import { makeRow } from '../../evaluate';
import { Evaluation } from '../../evaluate';
import { AnswerType, ResultReturnType } from './result';
type SimpleType = (txt: string, res: AnswerType, ans: AnswerType, result: ResultReturnType) => Evaluation;
export class Evaluate {
  static readonly DEFAULT = function evaluate() {
    return new Evaluation(0, 0, '');
  }
  static readonly SIMPLE: SimpleType = function evaluate(txt, res, ans, result) {
    let correctCtr = 0;
    const text = makeRow(txt, (res as string), (ans as string));
    if (result) correctCtr++;
    return new Evaluation(1, correctCtr, text);
  }
  static readonly CORRELATED = function evaluate(txt: string[], ans: string[], res: string[], result: boolean | boolean[]) {
    const rows = new Array<string>();
    txt.forEach((txt1, idx) => {
      const ans1 = ans[idx];
      const res1 = res[idx];
      const row = makeRow(txt1, ans1, res1);
      rows.push(row);
    });
    const row_accum = rows.join('\n');
    const correctCtr = (result as Array<boolean>).filter(Boolean).length;
    return new Evaluation(ans.length, correctCtr, row_accum);
  }


  // static readonly LIST: SimpleType = function evaluate(txt, res, ans, result) {
  //   let correctCtr = 0;
  //   const text = makeRow(txt, (res as string[]), (ans as string[]));
  //   if (result) correctCtr++;
  //   return new Evaluation(1, correctCtr, text);
  // }
}
