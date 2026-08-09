import type { ResultType } from '../index';
import { isEqual } from 'lodash';
//Implments the strategy pattern but doesn't need explicit classes
//since functions are first-class objects in Typescript.
export class Result {
  /////////////////////////////////////////////////////////////////////////////
  //                          UNSUPPORTED
  /////////////////////////////////////////////////////////////////////////////
  //throws error for slides without responses
  //used with: INFO
  public static readonly UNSUPPORTED: ResultType = function (ans, res) {
    throw new Error(`Method not implemented. +${ans} ${res}`);
  };
  /////////////////////////////////////////////////////////////////////////////
  //                            SIMPLE
  /////////////////////////////////////////////////////////////////////////////
  //simple comparison outputting one boolean
  //used with: IMAP, MC, SELECT, SORT
  public static readonly SIMPLE: ResultType = function (ans, res) {
    return isEqual(ans, res);
  };
  /////////////////////////////////////////////////////////////////////////////
  //                          CORRELATED
  /////////////////////////////////////////////////////////////////////////////
  //array comparison where the correlated elements of two
  //arrays each represent a separate question, so it returns
  //an array of results {1,2,3},{1,3,3} -> {true,false,true}
  //used with: GAP
  public static readonly CORRELATED: ResultType = function (ans, res) {
    const retval = new Array<boolean>();
    if (res != null) {
      (ans as Array<string>).forEach((ansa, idx) => {
        let val = false;
        if (isEqual(ansa, res[idx])) val = true;
        retval.push(val);
      });
    }
    return retval;
  };
  /////////////////////////////////////////////////////////////////////////////
  //                            PARTIAL
  /////////////////////////////////////////////////////////////////////////////
  // Fractional (0..1) credit for "select N" questions with a fixed option
  // pool: one point per correct selection, minus one point per incorrect
  // selection, floored at 0, normalized by the number of correct answers.
  // used with: extended (partial-credit) multiple response
  public static readonly PARTIAL: ResultType = function (ans, res) {
    const ansArr = (ans ?? []) as Array<string>;
    const resArr = (res ?? []) as Array<string>;
    if (ansArr.length === 0) return 0;
    const correctCount = resArr.filter((r) => ansArr.includes(r)).length;
    const incorrectCount = resArr.filter((r) => !ansArr.includes(r)).length;
    return Math.max(0, correctCount - incorrectCount) / ansArr.length;
  };
}
