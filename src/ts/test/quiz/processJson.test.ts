import { expect, it } from 'vitest';
import { ProcessJson } from '../../main/datalayer/courseData/processJson';
import { Mc } from '../../main/slide/slideType/mc/slideTypeMc';
const testjson = `
  {
    "name": "course 1",
    "units": [
      {
        "name": "unit 1",
        "lessons": [
          {
            "name": "lesson 1",
            "modules": [
              {
                "name": "module 1",
                "inst": [
                  {
                    "type": "info",
                    "txt": "info1"
                  }
                ],
                "exercises": [
                  {
                    "type": "mc",
                    "txt": "mc",
                    "o": ["o1", "o2"]
                  },
                  {
                    "type": "gap",
                    "text": "text (1) text (2)",
                    "ans": ["ans1", "ans2"]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
`;
sessionStorage.setItem('random', 'false');
it('testProcessSlides', () => {
  const slideArr = ProcessJson.processJson(JSON.parse(testjson));
  expect(slideArr).toBeDefined();
  expect(slideArr).not.to.be.empty;
  expect(slideArr.length).toEqual(7);
  const slide = slideArr[5];
  expect(slide).toBeDefined();
  expect(slide).not.to.be.empty;
  expect(slide).toBeInstanceOf(Mc);
  expect((slide as Mc).o[0]).toBe('o1');
  expect((slide as Mc).txt).toBe('mc');
});
