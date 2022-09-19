export class SaveData {
    txt:string;
    result:boolean|Array<boolean>|null;
    constructor(txt:string, result:boolean|Array<boolean>|null) {
        this.txt=txt;
        this.result=result;
    }
}
