export class ResponseA {
    txt:string;
    ans:string;
    res:string;
    constructor(txt:string, ans:string, res:string) {
        this.txt=txt;
        this.ans=ans;
        this.res=res;
    }
}
export class ResponseB {
    resp:Array<ResponseA>=new Array<ResponseA>();
    init(txt:Array<string>,ans:Array<string>, res:Array<string>) {
        txt.forEach((txt1,idx) => {
            const ans1=ans[idx];
            const res1=res[idx];
            this.resp.push(new ResponseA(txt1,ans1,res1));
        })
    }
    [Symbol.iterator]():IterableIterator<ResponseA> {
        return this.resp.values();
    }
    push(txt:string, ans:string, res:string):void {
        const resp = new ResponseA(txt,ans,res);
        this.resp.push(resp);
    }
    getAns():Array<string> {
        return this.resp.map(a => a.ans);
    }
    getTxt():Array<string> {
        return this.resp.map(a => a.txt);
    }
    getRes():Array<string> {
        return this.resp.map(a => a.res);
    }
    itor() {
        return this.resp.entries();
    }
    get():Array<ResponseA>{
        return this.resp;
    }
}