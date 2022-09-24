import { makeRow } from '../../evaluate';
import { Evaluation } from '../../evaluate';
import { AnswerType, ResultReturnType } from './result';
type SimpleType = (txt: string, res: AnswerType, ans: AnswerType, result: ResultReturnType) => Evaluation;
export class Evaluate {
  static readonly SIMPLE: SimpleType = function evaluate(txt, res, ans, result) {
    let correctCtr = 0;
    const text = makeRow(txt, (res as string), (ans as string));
    if (result) correctCtr++;
    return new Evaluation(1, correctCtr, text);
  }
  // static readonly LIST: SimpleType = function evaluate(txt, res, ans, result) {
  //   let correctCtr = 0;
  //   const text = makeRow(txt, (res as string[]), (ans as string[]));
  //   if (result) correctCtr++;
  //   return new Evaluation(1, correctCtr, text);
  // }
}
