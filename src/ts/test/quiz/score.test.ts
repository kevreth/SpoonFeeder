import { Score } from '../../main/quiz/score';
import { expect, it } from 'vitest';
import { ISummaryLine, SummaryLine } from 'app/main/quiz/score';
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
export const expected =
  '[{"name":"course 1","score":0,"complete":0,"pctCorrect":"0%","count":16,"pctComplete":"0%","children":[{"name":"unit 1","score":0,"complete":0,"pctCorrect":"0%","count":16,"pctComplete":"0%","children":[{"name":"lesson 1","score":0,"complete":0,"pctCorrect":"0%","count":16,"pctComplete":"0%","children":[{"name":"module 1","score":0,"complete":0,"pctCorrect":"0%","count":16,"pctComplete":"0%"}]}]}]}]';
it('description', () => {
  //   Json.set(JSON.parse(results));
  //   const doc = yaml.load(
  //     fs.readFileSync('src/courses/test/course.yml', 'utf8')
  //   ) as Course;
  //   const score = Score.summary(doc);
  //   const act = JSON.stringify(score);
  const exp = JSON.stringify(JSON.parse(expected));
  expect(exp).toEqual(exp);
});
it('quickSummary',() => {
   const module_0 = new SummaryLine();
   const module_1 = new SummaryLine();
   const module_2 = new SummaryLine();
   const module_3 = new SummaryLine();
   const lesson_0 = new SummaryLine();
   const lesson_1 = new SummaryLine();
   const unit_0 = new SummaryLine();
   const unit_1 = new SummaryLine();
   const course = new SummaryLine();
   module_0.complete = 1;
   module_1.complete = 0;
   module_2.complete = 0;
   module_3.complete = 0;
   lesson_0.complete = 1;
   lesson_1.complete = 0;
   unit_0.complete=1;
   unit_1.complete=0;
   lesson_0.children=new Array<ISummaryLine>();
   lesson_0.children.push(module_0);
   lesson_0.children.push(module_1);
   lesson_1.children=new Array<ISummaryLine>();
   lesson_1.children.push(module_2);
   lesson_1.children.push(module_3);
   const course_arr:Array<ISummaryLine> = new Array<ISummaryLine>();
   course_arr.push(course);

   const quickSummary = Score.quickSummary(course_arr);
});