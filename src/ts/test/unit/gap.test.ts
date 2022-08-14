import {Gap} from '../../main/slideType/gap';
import {gap} from '../../main/course';
import "html-validate/jest";
import { TextEncoder, TextDecoder } from 'util'
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder
import { JSDOM, VirtualConsole } from 'jsdom';
const virtualConsole = new VirtualConsole();
virtualConsole.sendTo(console);
const DOC = new JSDOM(`<!DOCTYPE html><body></body>`,virtualConsole).window.document;
const question = "text (1) text (2) text (3)";
const ans=["ans1", "ans2", "ans3"]
const json1:gap = {
	txt: "text (1) text (2) text (3)",
	ans:["ans1", "ans2", "ans3"],
	type:"gap",
	isExercise: false
}
test('fills', () => {
	const result = new Gap().fills(ans);
	expect(result).not.toBeNull();
	expect(result).toHTMLValidate();
	expect(result).toContain("fill0");
	expect(result).toContain("fill2");
});
test('gaps', () => {
	const result = new Gap().gaps(ans.length,question);
	expect(result).not.toBeNull();
	// expect(result).toHTMLValidate();
	expect(result).toContain("(1) text");
	expect(result).toContain("(3)");
});
test('createHtml', () => {
	const result = new Gap().createHtml(ans, question);
	expect(result).not.toBeNull();
	// expect(result).toHTMLValidate();
	expect(result).toContain("fill0");
	expect(result).toContain("fill2");
	expect(result).toContain("ans1");
	expect(result).toContain("ans3");
	expect(result).toContain("(1) text");
	expect(result).toContain("(3)");
});
test('setgap', () => {
	// let gap = new Gap();
	// DOC.body.innerHTML = gap.createHtml(ans, question);
	// gap.setgap(1,DOC);
});
test('setfills', () => {
	const result = new Gap().createHtml(ans, question);
});
test('getMaxWidth', () => {
	let gap = new Gap();
	DOC.body.innerHTML = gap.createHtml(ans, question);
	console.log(DOC.body.innerHTML);
	const result = gap.getMaxWidth(1,DOC);
	// expect(result).toEqual(3);
});