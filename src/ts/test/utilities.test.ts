import { JSDOM } from 'jsdom';
import { expect, it } from 'vitest';
import {
  difference,
  getChildIds,
  intersection,
  isEqual,
  makeButton,
  adoc2markdown
} from '../main/utilities';
const testArr1 = [1, 2];
const testArr2 = [2, 3];
it('makeButton', () => {
  const str = makeButton('ABC', 'DEF', 'HIJ');
  expect(str).toContain('id="ABC"');
  expect(str).toContain('class="DEF"');
  expect(str).toContain('>HIJ<');
  expect(str).toBeDefined();
  expect(str).not.to.be.empty;
  expect(str).to.be.string;
});
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
it('test adoc2markdown', () => {
  const txt = `

== Document Title

  * This is a list item.
  ** This is another list item.

    . item1
    . item2
    . This is _italics_.
    . This is *boldface*.
  `;
  const act = adoc2markdown(txt);
  expect(act).not.toBeNull();
  expect(act).toContain('## Document Title');
  expect(act).toContain('4. This is **boldface**.');
});
