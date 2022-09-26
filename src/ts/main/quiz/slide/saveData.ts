import { AnswerType } from './strategies/result';

export class SaveData {
    txt:AnswerType;
    result:AnswerType;
    constructor(txt:AnswerType, result:AnswerType) {
        this.txt=txt;
        this.result=result;
    }
}
