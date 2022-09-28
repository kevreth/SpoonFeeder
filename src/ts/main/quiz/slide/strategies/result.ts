import { isEqual } from '../../../utilities';
export type AnswerType = string | Array<string> | Array<number>;
export type ResultReturnType = boolean | Array<boolean>;
export type ResultType = (ans: AnswerType, res: AnswerType) => ResultReturnType
//Implments the strategy pattern but doesn't need explicit classes
//since functions are first-class objects in Typescript.
export class Result {
  //throws error for slides without responses
  //used with: INFO, SLIDES (default)
  public static readonly UNSUPPORTED: ResultType = function(ans, res) {
    throw new Error(`Method not implemented. +${ans} ${res}`);
  };
  //simple scalar string comparison
  //used with: IMAP, MC
  public static readonly SIMPLE: ResultType = function(ans, res) {
    return ans === res;
  };
  //array comparison where the two lists must be equal for true result
  //example: {1,2,3},{1,2,3} -> true
  //example: {4,5,6},{4,0,6} -> false
  //used with: SELECT, SORT
  public static readonly LIST: ResultType = function(ans, res) {
    return isEqual(ans, res);
  };
  //array comparison where the correlated elements of two
  //arrays each represent a separate question, so it returns
  //an array of results {1,2,3},{1,3,3} -> {true,false,true}
  //used with: VOCAB, GAP
  public static readonly CORRELATED: ResultType = function(ans, res) {
    const retval = new Array<boolean>();
    (ans as Array<string>).forEach((ansa, idx) => {
      if (ansa === res[idx]) retval.push(true);
      else retval.push(false);
    });
    return retval;
  };
}
