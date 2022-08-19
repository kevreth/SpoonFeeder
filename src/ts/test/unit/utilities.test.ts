import { expect, it } from 'vitest'
import {isEqual, difference, intersection, makeButton, getChildIds, getNumberedProperties}
from '../../main/utilities';
import { JSDOM } from 'jsdom';
const testArr1 = [1,2];
const testArr2 = [2,3];
it('makeButton', () => {
  let str = makeButton('ABC', 'DEF', 'HIJ');
  expect(str).toContain('id="ABC"');
  expect(str).toContain('class="DEF"')
  expect(str).toContain('>HIJ<')
  expect(str).toBeDefined()
  expect(str).not.to.be.empty
  expect(str).to.be.string;
});
it('difference', () => {
  let result = difference(testArr1,testArr2);
  expect(result).toEqual([1]);
});
it('intersection', () => {
  let result = intersection(testArr1,testArr2);
  expect(result).toEqual([2]);
});
it('isEqual0', () => {
  let result = isEqual(testArr1,testArr2);
  expect(result).toEqual(false);
});
it('isEqual1', () => {
  let result = isEqual(testArr1,testArr1);
  expect(result).toEqual(true);
});
it('getChildIds',() => {
	const dom = new JSDOM(`<!DOCTYPE html><body></body>`);
	const html = `
  <div id="parent-div">
    <div id="div-no-1"></div>
    <div id="div-no-2"></div>
    <div id="div-no-3"></div>
    <div id="div-no-4"></div>
  </div>
  `;
	dom.window.document.body.innerHTML = html;
  const doc = dom.window.document;
	const ids = getChildIds(doc, "parent-div");
  expect(ids).not.toBeNull()
  expect(ids).not.to.be.empty;
  expect(ids.length).toBe(4);
  expect(ids[2]).toBe("div-no-3");
})
it('getNumberedProperties',() => {
  const obj = {
    typeA_2: "b",
    typeB_2: "2",
    typeB_1: "1",
    typeA_1: "a"
  }
  const actual:Array<object> = getNumberedProperties(obj,"typeA");
  expect(actual.length).toBe(2);
  expect(actual[0][0]).toBe("typeA_1");
  expect(actual[0][1]).toBe("a");
  expect(actual[1][0]).toBe("typeA_2");
  expect(actual[1][1]).toBe("b");
})