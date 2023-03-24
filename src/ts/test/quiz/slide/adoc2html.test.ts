import { expect, it } from 'vitest';
import { adoc2markdown} from '../../../main/quiz/slide/adoc2html';
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
