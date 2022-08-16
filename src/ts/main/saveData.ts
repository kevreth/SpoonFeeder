export class SaveData {
	txt:string;
	subtype:string|null;
	result:boolean|Array<boolean>|null;
	constructor(txt:string, subtype:string|null, result:boolean|Array<boolean>|null) {
		this.txt=txt;
		this.subtype=subtype;
		this.result=result;
	}
}