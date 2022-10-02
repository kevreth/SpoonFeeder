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
import { Evaluation } from '../../evaluate';
// Only makeRow from Evaluation is required.
const { makeRow } = Evaluation;

export type FunctionType = (
  response: string,
  answer: string,
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
export type EvaluateTypeDefault = () => Evaluation;
export type EvaluateTypeSimple = (
  txt: string,
  res: string,
  ans: string,
  result: boolean
) => Evaluation;
export type EvaluateTypeVocab = (
  txt: string[],
  res: string[],
  ans: string[],
  result: Array<boolean>
) => Evaluation;
export type EvaluateTypeGap = (
  txt: string,
  res: string[],
  ans: string[],
  result: Array<boolean>
) => Evaluation;
///////////////////////////////////////////////////////////////////////////////
// Unification of all evaluation strategy types. Necessary for polymorphically
// referring to any evaluation strategy.
///////////////////////////////////////////////////////////////////////////////
export type EvaluateType =
  | EvaluateTypeSimple
  | EvaluateTypeVocab
  | EvaluateTypeGap;
export class Evaluate {
  /////////////////////////////////////////////////////////////////////////////
  //
  // The strategy functions begin here.
  //
  /////////////////////////////////////////////////////////////////////////////
  //
  //
  /////////////////////////////////////////////////////////////////////////////
  //////////////////////////////// default ////////////////////////////////////
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
  //////////////////////////////// simple /////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////
  // one question -> one response
  //Used by IMAP, MC, SELECT, SORT
  public static readonly SIMPLE: EvaluateTypeSimple = function evaluate(
    txt,
    res,
    ans,
    result
  ) {
    let correctCtr = 0;
    const text = makeRow(txt, res, ans);
    if (result) correctCtr++;
    return new Evaluation(1, correctCtr, text);
  };
  /////////////////////////////////////////////////////////////////////////////
  //
  //
  //
  /////////////////////////////////////////////////////////////////////////////
  //////////////////////////////// vocab //////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////
  // multiple questions (definitions) correlate to multiple responses (terms)
  public static readonly VOCAB: EvaluateTypeVocab = function evaluate(
    txt,
    res,
    ans,
    result
  ) {
    // Vocab uses arrays of answers and responses. We evaluate in a correlated
    // manner inside a loop. Each correlated answer produces one row of output.
    const rows = new Array<string>();
    const length = ans.length;
    ans.forEach((answer, idx) => {
      const response = res[idx];
      const row = Evaluate.vocabRow(response, answer, txt, idx, length);
      rows.push(row);
    });
    const row_accum = rows.join('\n');
    const correctCtr = result.filter(Boolean).length;
    return new Evaluation(length, correctCtr, row_accum);
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private static vocabRow: FunctionType = function (
    response,
    answer,
    text,
    idx,
    length
  ) {
    return makeRow(text[idx], response, answer);
  };
  /////////////////////////////////////////////////////////////////////////////
  //
  //
  //
  /////////////////////////////////////////////////////////////////////////////
  //////////////////////////////// gap ////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////
  public static readonly GAP: EvaluateTypeGap = function evaluate(
    txt,
    res,
    ans,
    result
  ) {
    const rows = new Array<string>();
    const length = ans.length;
    ans.forEach((answer, idx) => {
      const response = res[idx];
      const row = Evaluate.gapQuest(response, answer, txt, idx, length);
      rows.push(row);
    });
    const row_accum = rows.join('\n');
    const correctCtr = result.filter(Boolean).length;
    return new Evaluation(length, correctCtr, row_accum);
  };
  // With multiple answers per one question, gap doesn't play by the same
  // rule and requires special treatment.
  private static gapQuest: FunctionType = function (
    response,
    answer,
    text,
    idx,
    length
  ) {
    let replaceValue = '';
    // Gap shows multiple answers to questions. The first column will span
    // multiple rows to display the question (1 correct, 2 incorrect):
    //
    // Example:
    //              QUESTION                         RESPONSE  ANSWER
    //                                                 rain     rain
    //  The ____ in ____ stays mainly in the ____.     plain    Spain
    //                                                 Spain    plain
    //
    // First column of first row requires special treatment
    // to display question.
    if (idx === 0) replaceValue = `<td rowspan="${length}">${text}</td>`;
    let row_a = makeRow(replaceValue, response, answer);
    // makeRow wasn't designed for this type of question.
    // Remove extra cell (td) tags.
    row_a = row_a.replace(`<td>${replaceValue}</td>`, replaceValue);
    return row_a;
  };
}
///////////////////////////////////////////////////////////////////////////////
