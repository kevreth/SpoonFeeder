import { JSDOM } from 'jsdom';
import { expect, it } from 'vitest';
import {
  getChildIds,
  remove,
} from '../main/quiz/utilities';
import {
  difference,
  intersection,
  isEqual
} from '../main/mediator';
const testArr1 = [1, 2];
const testArr2 = [2, 3];
it('difference', () => {
  const result = difference(testArr1, testArr2);
  expect(result).toEqual([1]);
});
it('intersection', () => {
  const result = intersection(testArr1, testArr2);
  expect(result).toEqual([2]);
});
it('isEqual0', () => {
  const result = isEqual(testArr1, testArr2);
  expect(result).toEqual(false);
});
it('isEqual1', () => {
  const result = isEqual(testArr1, testArr1);
  expect(result).toEqual(true);
});
it('getChildIds', () => {
  const dom = new JSDOM('<!DOCTYPE html><body></body>');
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
  const ids = getChildIds(doc, 'parent-div');
  expect(ids).not.toBeNull();
  expect(ids).not.to.be.empty;
  expect(ids.length).toBe(4);
  expect(ids[2]).toBe('div-no-3');
});
it('remove', () => {
  const arr = ['1', '2', '3'];
  const actual = remove(arr, '2');
  const expected = ['1', '3'];
  expect(actual).toEqual(expected);
});
