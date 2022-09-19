import { isEqual } from './utilities';
export type AnswerType = string | Array<string> | Array<number>;
export type ResultReturnType = boolean | Array<boolean>;
//Implments the strategy pattern but doesn't need explicit classes
//since functions are first-class objects in Typescript.
export class Result {
  //throws error for slides without responses
  //used with: INFO, SLIDES (default)
  static readonly UNSUPPORTED = function(ans: AnswerType, res: AnswerType): ResultReturnType {
    throw new Error(`Method not implemented. +${ans} ${res}`);
  };
  //simple scalar string comparison
  //used with: IMAP, MC
  static readonly SIMPLE = function(ans: AnswerType, res: AnswerType): ResultReturnType {
    return ans === res;
  };
  //array comparison where the two arrays must be equal,
  //using numbers {1,2,3},{1,3,3} -> {false}
  //used with: SELECT, SORT
  static readonly LIST = function(ans: AnswerType, res: AnswerType): ResultReturnType {
    return isEqual(ans, res);
  };
  //array comparison where the correlated elements of two
  //arrays each represent a separate question, so it returns
  //an array of results {1,2,3},{1,3,3} -> {true,false,true}
  //used with: VOCAB, GAP
  static readonly CORRELATED = function(ans: AnswerType, res: AnswerType): ResultReturnType {
    const retval = new Array<boolean>();
    (ans as Array<string>).forEach((ansa, idx) => {
      if (ansa === res[idx]) retval.push(true);
      else retval.push(false);
    });
    return retval;
  };
}
