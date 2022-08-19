import { expect, it } from 'vitest'
import { TextEncoder, TextDecoder } from 'util'
import { JSDOM } from 'jsdom';
import type {mc} from '../../main/course';
import {Mc} from '../../main/slideType/mc';
import { SlideFactory } from '../../main/slideFactory';
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder
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
it('init',() => {
	// const dom = new JSDOM(`<!DOCTYPE html><body></body>`);
	// const html = createHtml(question, options);
	// dom.window.document.body.innerHTML = html;
	// addBehavior(dom.window.document, options[0], options.length, 0, answers, slide);
})
