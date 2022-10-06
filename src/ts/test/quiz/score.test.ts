import * as fs from 'fs';
import * as yaml from 'js-yaml';
import { expect, it } from 'vitest';
import { Json } from '../../main/globals';
import type { Course } from '../../main/quiz/course';
import { Score } from '../../main/quiz/score';
export const results = `
[
  {
     "txt":"course 1"
  },
  {
     "txt":"Unit 1:<br>unit 1"
  },
  {
     "txt":"Lesson 1:<br>lesson 1"
  },
  {
     "txt":"Module 1:<br>module 1"
  },
  {
     "txt":"yes",
     "result":"no"
  },
  {
     "txt":"no",
     "result":"no"
  },
  {
     "txt":"no1",
     "result":"no"
  },
  {
     "txt":[
        "something that is currently in use",
        "a narrow road between buildings",
        "recognition for doing something well",
        "like win, but requires an object, the team or person who lost, when used in the active voice",
        "someone starting to learn a skill"
     ],
     "result":[
        "beat",
        "beat",
        "beat",
        "beat",
        "beat"
     ]
  },
  {
     "txt":"sort",
     "result":[
        "b",
        "a",
        "c",
        "d"
     ]
  },
  {
     "txt":"choose blue",
     "result":"blue"
  },
  {
     "txt":"text (1) text (2) text (3)",
     "result":[
        "ans1",
        "ans2",
        "ans3"
     ]
  },
  {
     "txt":"This is a test of underlining.",
     "result":[

     ]
  },
  {
     "txt":[
        "something that is currently in use",
        "a narrow road between buildings",
        "recognition for doing something well",
        "like win, but requires an object, the team or person who lost, when used in the active voice",
        "someone starting to learn a skill"
     ],
     "result":[
        "active",
        "beat",
        "beat",
        "beat",
        "beat"
     ]
  },
  {
     "txt":"If only we ____ have to learn the periodic table of the elements by tomorrow!",
     "result":"don't"
  }
]
`;
export const expected = `
{
  "name":"course 1",
  "count":16,
  "score":5,
  "children":[
     {
        "name":"unit 1",
        "count":16,
        "score":5,
        "children":[
           {
              "name":"lesson 1",
              "count":16,
              "score":5,
              "children":[
                 {
                    "name":"module 1",
                    "count":16,
                    "score":5
                 }
              ]
           }
        ]
     }
  ]
}
`;
it('description', () => {
  Json.set(JSON.parse(results));
  const doc = yaml.load(
    fs.readFileSync('src/courses/test/course.yml', 'utf8')
  ) as Course;
  const score = Score.summary(doc);
  const act = JSON.stringify(score);
  const exp = JSON.stringify(JSON.parse(expected));
  expect(act).toEqual(exp);
});
