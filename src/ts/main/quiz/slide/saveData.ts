import { AnswerType } from './strategies/result';

export class SaveData {
    txt:string;
    result:AnswerType;
    constructor(txt:string, result:AnswerType) {
        this.txt=txt;
        this.result=result;
    }
}
