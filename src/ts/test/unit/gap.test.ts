import { expect, it } from 'vitest'
import {Gap} from '../../main/slideType/gap';
import type {gap} from '../../main/course';
// import "html-validate/jest";
import { JSDOM, VirtualConsole } from 'jsdom';
const virtualConsole = new VirtualConsole();
virtualConsole.sendTo(console);
const DOC = new JSDOM(`<!DOCTYPE html><body></body>`,{virtualConsole}).window.document;
const question = "text (1) text (2) text (3)";
const ans=["ans1", "ans2", "ans3"]
const json1:gap = {
	txt: "text (1) text (2) text (3)",
	ans:["ans1", "ans2", "ans3"],
	type:"gap",
	isExercise: false
}
it('fills', () => {
	const result = new Gap().fills(ans);
	expect(result).not.toBeNull();
	// expect(result).toHTMLValidate();
	expect(result).toContain("fill0");
	expect(result).toContain("fill2");
});
it('gaps', () => {
	const result = new Gap().gaps(ans.length,question);
	expect(result).not.toBeNull();
	// expect(result).toHTMLValidate();
	expect(result).toContain("(1) text");
	expect(result).toContain("(3)");
});
it('createHtml', () => {
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
it('setgap', () => {
	// let gap = new Gap();
	// DOC.body.innerHTML = gap.createHtml(ans, question);
	// gap.setgap(1,DOC);
});
it('setfills', () => {
	const result = new Gap().createHtml(ans, question);
});
it('getMaxWidth', () => {
	const gap = new Gap();
	DOC.body.innerHTML = gap.createHtml(ans, question);
	const result = gap.getMaxWidth(1,DOC);
	// expect(result).toEqual(3);
});