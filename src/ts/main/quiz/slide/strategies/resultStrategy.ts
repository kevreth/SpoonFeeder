import { isEqual } from '../../../utilities';
export type AnswerType = string | Array<string> | Array<number>;
export type ResultReturnType = boolean | Array<boolean>;
export type ResultType = (ans: AnswerType, res: AnswerType) => ResultReturnType;
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
  //used with: VOCAB, GAP
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
}
