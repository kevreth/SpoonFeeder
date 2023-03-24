import { expect, it } from 'vitest';
import { adoc2markdown, replaceMustache, RANDOM} from '../../../main/quiz/slide/adoc2html';
const asciidoc = `

== Document Title

* This is a list item.
** This is another list item.

  . item1
  . item2
  . This is _italics_.
  . This is *boldface*.
`;
it('test adoc2markdown', () => {
  const act = adoc2markdown(asciidoc);
  expect(act).not.toBeNull();
  expect(act).toContain('## Document Title');
  expect(act).toContain('4. This is **boldface**.');
});
it('test replaceMustache',() => {
  const PATTERN = "{{{'test'}}}";
  const template = `A ${PATTERN} B ${PATTERN} C`;
  const exp = `A ${RANDOM} B ${RANDOM} C`;
  const act = replaceMustache(template);
  expect(act).not.toBeNull();
  expect(act).toHaveLength(3); //template + 2 patterns
  console.log(act[0]);
  console.log(exp);
  expect(act[0]).toEqual(exp);
  expect(act[1]).toEqual(PATTERN);
  expect(act[2]).toEqual(PATTERN);
});


