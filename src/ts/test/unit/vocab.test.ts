import 'jest-chain';
import 'jest-extended/all';
import { TextEncoder, TextDecoder } from 'util'
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder
import {vocab} from '../../main/course'
import { JSDOM } from 'jsdom';
import {Vocab} from '../../main/slideType/vocab'
sessionStorage.setItem("random","false");
const DOC = new JSDOM(`<!DOCTYPE html><body></body>`).window.document;
const MAP:Map<string,string> = new Map([
	["term1","def1"],
	["term2","def2"],
	["term3","def3"],
	["term4","def4"],
	["term5","def5"]
]);
const json:vocab = {
	type:"vocab",
	list: MAP,
	isExercise: false
}
const slide:Vocab = new Vocab();
slide.processJson(json);
test('generateQuestions', () => {
	const result = new Vocab().generateQuestions(MAP);
	expect(result).not.toBeNull();
	expect(result.length).toBe(5);
	expect(result[0][0]).not.toBeNull();
	expect(result[0][1]).not.toBeNull();
	expect(result[0][2].length).toBe(4);
	expect(result[0][0]).toMatch(/def/);
	expect(result[0][1]).toMatch(/term/);
});
test('createHtmlLoop', () => {
	const voc = new Vocab();
	const vocabTuples = voc.generateQuestions(MAP);
	const result = voc.createHtmlLoop(vocabTuples);
	expect(result).not.toBeNull();
	expect(result.length).toBe(5);
});
//test that the question and 4 buttons appear
test('includesEverything', () => {
	new Vocab().proc(MAP,DOC);
	const buttons = DOC.getElementsByTagName("button");
	expect(buttons.length).toBe(4);
	const questionId = DOC.getElementById('content');
	expect(questionId).not.toBeNull();
});
	//test that click changes button color
	//we can't easily test for initial color because
	//it's set by style sheet and is not in the DOM
test('correctAnswerGreen', () => {
	new Vocab().proc(MAP,DOC);
	const button = DOC.getElementById('btn0');
	expect(button.style.backgroundColor).toBeEmpty();
	button.click();
	expect(button.style.backgroundColor).toBe("green");
});
//test that click changes button color
//we can't easily test for initial color because
//it's set by style sheet and is not in the DOM
test('wrongAnswerRed', () => {
	new Vocab().proc(MAP,DOC);
	const button = DOC.getElementById('btn2');
	expect(button.style.backgroundColor).toBeEmpty();
	button.click();
	expect(button.style.backgroundColor).toBe("red");
});
//test that event listeners have been removed
test('eventListenersRemoved', () => {
	new Vocab().proc(MAP,DOC);
	const btn0Id = DOC.getElementById('btn0');
	btn0Id.click();
	const btn3Id = DOC.getElementById('btn3');
	expect(btn3Id.style.backgroundColor).toBeEmpty();
	btn3Id.click();
	expect(btn3Id.style.backgroundColor).toBeEmpty();
});
//test that continue button appears after clicking
//an option button
test('checkContinueButton', () => {
	new Vocab().proc(MAP,DOC);
	const btn0 = DOC.getElementById('btn0');
	btn0.click();
	const btn = DOC.getElementById('btn');
	expect(btn).not.toBeNull()
});
test('response', () => {
	new Vocab().proc(MAP,DOC);
});
