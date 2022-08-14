import {Evaluation} from '../evaluation';
import { Slide } from '../slide';
import {info} from '../course';
import {showButton} from '../quiz';
import { ResultReturnType } from '../result';
import { SaveData } from '../saveData';
export class Info extends Slide<string> {
	txt:string;
	subtype:string;
	processJson(json: info): void {
		this.txt = json.txt;
		this.subtype = json.subtype;
	}
	makeSlides(doc:Document): void {
		this.createPageContent(`\n${this.txt}`,doc);
		this.saveData();
		showButton(doc);
	}
	evaluate(): Evaluation {
		return new Evaluation(0, 0, "");
	}
	result(ans: string, res: string): ResultReturnType {
		throw new Error(`Method not implemented. +${ans} ${res}`);
	}
	//don't record CCQ results
	getSaveData():SaveData {
		return new SaveData(this.txt,this.subtype, null);
	}
}