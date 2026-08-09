import { expect, it } from 'vitest';
import { ProcessJson } from '../../../main/course/courseData/processJson';
import { Mc } from '../../../main/slidetype/types/mc/slideTypeMc';
import { Ma } from '../../../main/slidetype/types/ma/slideTypeMa';

// Case-study/trend item cluster: one `type: cluster` YAML entry expands into
// its `set` of ordinary child slides, each stamped with shared group
// metadata by jsonProcessor.ts's _expandCluster — distinct from Vocab's
// flatten-and-forget getSlideSet(), which drops all group identity.
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
              "exercises": [
                {
                  "type": "cluster",
                  "txt": "Day 1 scenario",
                  "set": [
                    {
                      "type": "mc",
                      "txt": "Which finding is most concerning?",
                      "o": ["fever", "normal pulse"],
                      "groupContext": "Vitals: T 38.7C HR 112",
                      "groupTag": "Analyze Cues"
                    },
                    {
                      "type": "ma",
                      "txt": "Select 2 actions.",
                      "o": ["a", "b", "c", "d"],
                      "numans": 2,
                      "groupTag": "Take Actions"
                    }
                  ]
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

it('expands a cluster into its child slides with shared, trending group metadata', () => {
  const slideArr = ProcessJson.processJson(JSON.parse(testjson));
  const mcSlide = slideArr.find((s) => s instanceof Mc) as Mc;
  const maSlide = slideArr.find((s) => s instanceof Ma) as Ma;

  expect(mcSlide).toBeDefined();
  expect(maSlide).toBeDefined();

  // Same group, correlated by a shared, non-empty groupId.
  expect(mcSlide.groupId).not.toBe('');
  expect(mcSlide.groupId).toBe(maSlide.groupId);

  expect(mcSlide.groupIndex).toBe(1);
  expect(maSlide.groupIndex).toBe(2);
  expect(mcSlide.groupTotal).toBe(2);
  expect(maSlide.groupTotal).toBe(2);

  expect(mcSlide.groupTag).toBe('Analyze Cues');
  expect(maSlide.groupTag).toBe('Take Actions');

  // Second child omits groupContext — it must carry forward ("trending").
  expect(mcSlide.groupContext).toBe('Vitals: T 38.7C HR 112');
  expect(maSlide.groupContext).toBe('Vitals: T 38.7C HR 112');

  // Each child is still independently, fully typed and scored — not a
  // flattened/forgotten reference.
  expect(mcSlide.o).toEqual(['fever', 'normal pulse']);
  expect(maSlide.numans).toBe(2);
});

it('assigns distinct groupIds to separate clusters in the same course', () => {
  const twoClusters = JSON.parse(testjson);
  twoClusters.units[0].lessons[0].modules[0].exercises.push({
    type: 'cluster',
    txt: 'Day 2 scenario',
    set: [{ type: 'mc', txt: 'Second cluster item', o: ['x', 'y'] }],
  });
  const slideArr = ProcessJson.processJson(twoClusters);
  const mcSlides = slideArr.filter((s) => s instanceof Mc) as Mc[];
  const groupIds = new Set(mcSlides.map((s) => s.groupId));
  expect(groupIds.size).toBe(2);
});
