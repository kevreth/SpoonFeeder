import * as fs from 'fs';
import * as yaml from 'js-yaml';
import { expect, it } from 'vitest';
import type { Course } from '../../main/quiz/course';
import { Score } from '../../main/quiz/score';
export const testJson = `
{
  "name":"course 1",
  "count":16,
  "children":[
     {
        "name":"unit 1",
        "count":16,
        "children":[
           {
              "name":"lesson 1",
              "count":16,
              "children":[
                 {
                    "name":"module 1",
                    "count":16
                 }
              ]
           }
        ]
     }
  ]
}
`;
it('description', () => {
  const doc = yaml.load(
    fs.readFileSync('src/courses/test/course.yml', 'utf8')
  ) as Course;
  const score = Score.summary(doc);
  const act = JSON.stringify(score);
  const exp = JSON.stringify(JSON.parse(testJson));
  expect(act).toEqual(exp);
});
