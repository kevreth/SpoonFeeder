export class SaveData {
	txt:string;
	subtype:string|null;
	result:boolean|Array<boolean>;
	constructor(txt:string, subtype:string|null, result:boolean|Array<boolean>) {
		this.txt=txt;
		this.subtype=subtype;
		this.result=result;
	}
}