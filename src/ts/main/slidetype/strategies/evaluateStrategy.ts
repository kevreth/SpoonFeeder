///////////////////////////////////////////////////////////////////////////////
// Evaluation algorithms for individual questions. Each question either
// produces a simple boolean or an array of booleans. An array of booleans
// results from questions that have multiple answers (gap and vocab).
// true = correct answer
// false = wrong answer
// This follows the strategy design pattern, but functions are used instead
// of classes.
///////////////////////////////////////////////////////////////////////////////
//
// Another evaluation class, but evaluates an entire set of questions.
import type { AnswerType } from '../mediator';
import { Evaluation, makeRow } from '../mediator';
// Only makeRow from Evaluation is required.
type FunctionType = (
  response: AnswerType,
  answer: AnswerType,
  text: string | string[],
  idx: number,
  length: number
) => string;
///////////////////////////////////////////////////////////////////////////////
// The types for each strategy.
// txt: The text of the question, which also serves as a unique identifier.
// res: The user responses to the question
// ans: The correct answers to the quesion
// result: The evaluated responses to the question after comparing res and ans.
///////////////////////////////////////////////////////////////////////////////
type EvaluateTypeDefault = () => Evaluation;
type EvaluateTypeSimple = (
  txt: string,
  res: AnswerType,
  ans: AnswerType,
  result: boolean
) => Evaluation;
type EvaluateTypeGap = (
  txt: string,
  res: AnswerType,
  ans: AnswerType,
  result: Array<boolean>
) => Evaluation;
///////////////////////////////////////////////////////////////////////////////
// Unification of all evaluation strategy types. Necessary for polymorphically
// referring to any evaluation strategy.
///////////////////////////////////////////////////////////////////////////////
export type EvaluateType = EvaluateTypeSimple | EvaluateTypeGap;
export class Evaluate {
  /////////////////////////////////////////////////////////////////////////////
  //
  //               The strategy functions begin here.
  //
  /////////////////////////////////////////////////////////////////////////////
  //
  //
  //
  /////////////////////////////////////////////////////////////////////////////
  //                             default
  /////////////////////////////////////////////////////////////////////////////
  // Used when there are no answers, such as INFO.
  public static readonly DEFAULT: EvaluateTypeDefault = function evaluate() {
    return new Evaluation(0, 0, '');
  };
  /////////////////////////////////////////////////////////////////////////////
  //
  //
  //
  /////////////////////////////////////////////////////////////////////////////
  //                             simple
  /////////////////////////////////////////////////////////////////////////////
  // one question -> one response
  //Used by IMAP, MC, SELECT, SORT
  public static readonly SIMPLE: EvaluateTypeSimple = function evaluate(
    txt,
    ans,
    res,
    result
  ) {
    let correctCtr = 0;
    if (result) correctCtr++;
    const text = makeRow(txt, res, ans);
    const count = res == null ? 0 : 1;
    return new Evaluation(count, correctCtr, text);
  };
  /////////////////////////////////////////////////////////////////////////////
  //
  //
  //
  /////////////////////////////////////////////////////////////////////////////
  //                                 gap
  /////////////////////////////////////////////////////////////////////////////
  public static readonly GAP: EvaluateTypeGap = function evaluate(
    txt,
    res,
    ans,
    result
  ) {
    const rowFunction: FunctionType = Evaluate.gapRow;
    return Evaluate.multiAnswerStrategy(ans, res, txt, result, rowFunction);
  };
  /////////////////////////////////////////////////////////////////////////////
  //                 The strategy functions end here.
  /////////////////////////////////////////////////////////////////////////////
  //
  //
  //
  /////////////////////////////////////////////////////////////////////////////
  //                      multiAnswerStrategy
  /////////////////////////////////////////////////////////////////////////////
  // Used by gap. Once also used by vobab, thus the rowFunction parameter.
  /////////////////////////////////////////////////////////////////////////////
  private static multiAnswerStrategy(
    ans: AnswerType,
    res: AnswerType,
    txt: string | string[],
    result: Array<boolean>,
    rowFunction: FunctionType
  ) {
    const rows = new Array<string>();
    let length = 0;
    if (ans != null) {
      length = ans.length;
      (ans as string[]).forEach((answer, idx) => {
        const response = res[idx];
        const row = rowFunction(
          response,
          answer as AnswerType,
          txt,
          idx,
          length
        );
        rows.push(row);
      });
    }
    const row_accum = rows.join('\n');
    const correctCtr = result.filter(Boolean).length;
    return new Evaluation(length, correctCtr, row_accum);
  }
  /////////////////////////////////////////////////////////////////////////////
  //                             gapRow
  /////////////////////////////////////////////////////////////////////////////
  // Gap shows multiple answers per question (txt). The first column will
  // span multiple rows to display the question (1 correct, 2 incorrect):
  //
  // Example:
  //              QUESTION                       RESPONSE ANSWER
  //                                               rain    rain
  //  The ____ in ____ stays mainly in the ____.   plain   Spain
  //                                               Spain   plain
  //
  // First column of first row requires special treatment
  // to display question.
  private static gapRow: FunctionType = function (
    response,
    answer,
    text,
    idx,
    length
  ) {
    let replaceValue = '';
    if (idx === 0) replaceValue = `<td rowspan="${length}">${text}</td>`;
    let row_a = makeRow(replaceValue, response, answer);
    // makeRow wasn't designed for this type of question.
    // Remove extra cell (td) tags.
    row_a = row_a.replace(`<td>${replaceValue}</td>`, replaceValue);
    return row_a;
  };
}
///////////////////////////////////////////////////////////////////////////////
