import { expect, it } from 'vitest';
import { adoc2markdown, replaceMustache, RANDOM, markdown2html, adoc2html, restoreMustache, processMustache} from '../../../main/quiz/datalayer/adoc2html';
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
const asciidocMustache = asciidoc + `
  {{{svg 'test1'}}}
  {{{table 'test2'}}}
`;
const PATTERN = "{{{'test'}}}";
const template = `A ${PATTERN} B ${PATTERN} C`;
const exp = `A ${RANDOM} B ${RANDOM} C`;
it('test replaceMustache',() => {
  const act = replaceMustache(template);
  expect(act).not.toBeNull();
  expect(act).toHaveLength(3); //template + 2 patterns
  expect(act[0]).toEqual(exp);
  expect(act[1]).toEqual(PATTERN);
  expect(act[2]).toEqual(PATTERN);
});
it('test restoreMustache',() => {
  const arr = [PATTERN,PATTERN];
  const act = restoreMustache(arr, exp);
  expect(act).not.toBeNull();
  expect(act).toEqual(template);
});
it('test processMustache',() => {
  const act = processMustache("{{{svg 'test1'}}}");
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
})
it('test adoc2html', () => {
  const act = adoc2html(asciidocMustache);
  expect(act).not.toBeNull();
  expect(act).toContain('h2');
  expect(act).toContain('li');
  expect(act).toContain('ul');
  expect(act).toContain('ol');
  expect(act).toContain('table0');
  expect(act).toContain('mcButton');
})
