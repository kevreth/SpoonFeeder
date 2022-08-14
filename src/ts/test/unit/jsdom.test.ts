import { TextEncoder, TextDecoder } from 'util'
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder
import { JSDOM } from 'jsdom';
import {mc} from '../../main/course';
import {Mc} from '../../main/slideType/mc';
import { SlideFactory } from '../../main/slideFactory';
const options = ["opt1","opt2","opt3"];
const question = "question";
const answers = "opt1";
const slide:Mc = new Mc();
const json:mc = {
	txt:null,
	o:options,
	ans:null,
	type:"mc",
	isExercise: false
};
slide.processJson(json);
test('init',() => {
	// const dom = new JSDOM(`<!DOCTYPE html><body></body>`);
	// const html = createHtml(question, options);
	// dom.window.document.body.innerHTML = html;
	// addBehavior(dom.window.document, options[0], options.length, 0, answers, slide);
})
