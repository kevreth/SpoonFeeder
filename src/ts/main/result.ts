import { isEqual } from './utilities';
export type AnswerType = string | Array<string> | Array<number>;
export type ResultReturnType = boolean | Array<boolean>;
export interface ResultInterface {
  result2(ans: AnswerType, res: AnswerType): ResultReturnType;
  result4(ans: AnswerType, res: AnswerType): ResultReturnType;
}
export class Result implements ResultInterface {
  //simple scalar string comparison
  //used with: IMAP, MC
  result(ans: string, res: string): ResultReturnType {
    return ans === res;
  }
  //throws error for slides without responses
  //used with: INFO
  result1(ans: string, res: string): ResultReturnType {
    throw new Error(`Method not implemented. +${ans} ${res}`);
  }
  //array comparison where the two arrays must be equal,
  //using numbers {1,2,3},{1,3,3} -> {false}
  //used with: SELECT, SORT
  result2(ans: AnswerType, res: AnswerType): ResultReturnType {
    return isEqual(ans, res);
  }
  //array comparison where the correlated elements of two
  //arrays each represent a separate question, so it returns
  //an array of results {1,2,3},{1,3,3} -> {true,false,true}
  //used with: VOCAB
  result4(ans: Array<string>, res: Array<string>): ResultReturnType {
    const retval = new Array<boolean>();
    ans.forEach((ansa, idx) => {
      if (ansa === res[idx]) retval.push(true);
      else retval.push(false);
    });
    return retval;
  }
}
