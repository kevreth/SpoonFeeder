import { assert, expect, it } from 'vitest';
import { Quiz } from '../main/quiz';
import { Mc } from '../main/quiz/slide/slideType/mc';
const testjson = `
  [
    {
      "type":"mc",
      "txt":"mc",
      "o": [
        "o1",
        "o2"
      ]
    },
    {
      "type":"gap",
      "text":"text (1) text (2)",
      "ans":[
        "ans1",
        "ans2"
      ]
    }
  ]
`;
sessionStorage.setItem('random', 'false');
it('testProcessSlides', () => {
  const json = Quiz.processSlides(JSON.parse(testjson));
  expect(json).toBeDefined();
  expect(json).not.to.be.empty;
  assert.containsAllKeys(json, ['0', '1']);
  expect(json[1]).toBeDefined();
  expect(json[1]).not.to.be.empty;
  expect(json[0]).toBeInstanceOf(Mc);
  expect((json[0] as Mc).o[0]).toBe('o1');
  expect((json[0] as Mc).txt).toBe('mc');
});
