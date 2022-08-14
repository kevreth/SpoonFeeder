export class Evaluation {
	responses: number;
	correct: number;
	text: string;
	constructor(responses: number, correct: number, text: string) {
		this.responses=responses;
		this.correct=correct;
		this.text=text;
	}
}