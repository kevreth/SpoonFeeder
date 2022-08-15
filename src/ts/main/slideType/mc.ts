import { makeButton, removeListener, isRandom, shuffle } from '../utilities';
import {showButton,makeRow} from '../quiz';
import {mc} from '../course';
import {Evaluation} from '../evaluation';
import { Slide1 } from '../slide';
export class Mc extends Slide1 {
	o=[];
	processJson(json:mc):void {
		({txt:this.txt,	o:this.o,	ans:this.ans, isExercise:this.isExercise}=json);
		this.ans=this.o[0];
	}
	makeSlides(doc:Document):void {
		const shuffleFlag = this.isExercise && isRandom();
		let options = this.o;
		if(shuffleFlag)
			options = shuffle(options);
		this.createPageContent(this.createHtml(this.txt, options),doc);
		this.createHtml(this.txt, options);
    options.forEach((option, optionCtr) => {
			this.addBehavior(doc, option, options.length, optionCtr, this.ans);
    });
		this.setWidths(options, doc);
	}
	public setWidths(options:string[], doc:Document):void {
		//Similar behavior exists in gap.ts. Possible refactor opportunity.
		let maxWidth = 0;
    options.forEach((option, optionCtr) => {
			const element = doc.getElementById('btn' + optionCtr) as HTMLElement;
			const width = element.offsetWidth;
			if(width>maxWidth) maxWidth=width;
		});	
		options.forEach((option, optionCtr) => {
			const element = doc.getElementById('btn' + optionCtr) as HTMLElement;
			element.style.width = `${maxWidth}px`;
		});	
	}
	addBehavior(
		doc:Document,
		option: string,
		length:number,
		optionCtr: number,
		ans: string
	):void {
			const element = doc.getElementById('btn' + optionCtr) as HTMLElement;
			element.addEventListener('click', () => {
					for (let i = 0; i < length; i++)
							removeListener(doc.getElementById("btn" + i) as HTMLElement);
					const optionButton = doc.getElementById("btn" + optionCtr) as HTMLElement;
					let color = 'red';
					if (this.result(option, ans)) color = 'green';
					optionButton.style.backgroundColor = color;
					this.res = option;
					this.saveData();
					showButton(doc);
			});
	}
	public createHtml(question: string, options: string[]):string {
		const accum = new Array<string>(`\n${question}<span style="display: block; margin-bottom: .5em;"></span>\n`);
		options.forEach((option, i) => {
				accum.push(makeButton('btn' + i, 'questionBtn', option) + '<br/>\n');
		});
		return accum.join('\n');
	}
	public evaluate():Evaluation {
		let correctCtr=0;
		const text = makeRow( this.txt,this.res,this.ans);
		if (this.result(this.ans,this.res)) correctCtr++;
		return new Evaluation(1, correctCtr, text);
	}
}
export class Bool extends Mc {
	o = ["yes","no"];
	processJson(json:mc):void {
		({txt:this.txt,	ans:this.ans, isExercise:this.isExercise}=json);
	}
}