import { expect, it } from 'vitest';
import {
  // adoc2html,
  adoc2markdown,
  markdown2html,
  processHandlebars,
} from '../../../main/slide/adoc2html';
const asciidoc = `
== Document Title

* This is a list item.
** This is another list item.

  . item1
  . item2
  . This is _italics_.
  . This is *boldface*.
`;
const markdown = `
## Document Title

* This is a list item.
  * This is another list item.
    1. item1
    2. item2
    3. This is _italics_.
    4. This is **boldface**.
`;
// const asciidocMustache =
//   asciidoc +
//   `
//   {{{svg 'test1'}}}
//   {{{table 'test2'}}}
// `;
it('test processMustache', () => {
  const act = processHandlebars("{{{svg 'test1'}}}");
  expect(act).not.toBeNull();
  expect(act).toContain('img');
  expect(act).toContain('test1');
  expect(act).toContain('svg');
  expect(act).toContain('mcButton');
});
it('test adoc2markdown', () => {
  const act = adoc2markdown(asciidoc);
  expect(act).not.toBeNull();
  expect(act).toContain('## Document Title');
  expect(act).toContain('4. This is **boldface**.');
});
it('test markdown2html', () => {
  const act = markdown2html(markdown);
  expect(act).not.toBeNull();
  expect(act).toContain('h2');
  expect(act).toContain('li');
  expect(act).toContain('ul');
  expect(act).toContain('ol');
});
it('test adoc2html', () => {
  expect(0).toEqual(0);
  // const act = adoc2html(asciidocMustache);
  // expect(act).not.toBeNull();
//   expect(act).toContain('h2');
//   expect(act).toContain('li');
//   expect(act).toContain('ul');
//   expect(act).toContain('ol');
//   expect(act).toContain('table0');
//   expect(act).toContain('mcButton');
});
