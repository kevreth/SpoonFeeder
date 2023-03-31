import { expect, it } from 'vitest';
import { SaveData } from '../../../main/quiz/datalayer/saveData';
import { SlideInterfaceProperties } from '../../../main/quiz/slideInterface';
import { SlideSaveMethods, SlideSave } from '../../../main/quiz/datalayer/slideSave';
const expected_saved = new Array<SaveData>();
expected_saved.push(new SaveData('ans1', 'res1', '200001010000', false));
expected_saved.push(new SaveData('ans2', 'res2', '200001010001', false));
expected_saved.push(new SaveData('ans3', 'res3', '200001010002', false));
const slides_test: SlideInterfaceProperties[] =
[
  {
    type: 'mc',
    txt: 'Choose A.',
    o: ['A','C','B','D']
  },
  {
    type: 'sort',
    txt: 'sort',
    ans: ['a','b','c','d']
  }
]
const savedata_test: SaveData[] =
[
  {
    txt: 'Choose A.',
    result: ['D'],
    ts: '20230231054055',
    cont: true
  },
  {
    txt: 'sort',
    result: ['a','b','c','d'],
    ts: '20230231054112',
    cont: false
  }
]
it('find_scalar', () => {
  const idx = SaveData.find('ans2', expected_saved);
  expect(idx).toEqual(1);
});
it('get current slide from saved data', () => {
  const slides = slides_test;
  const saves = savedata_test;
  const ssm = new SlideSaveMethods();
  const save = ssm.getLastSave(saves) as SaveData;
  expect(save.txt).toEqual('sort');
  const idx = ssm.findMatchingSlide(slides, save);
  expect(idx).toEqual(1);
  const slide = ssm.getMatchingSlide(slides, idx);
  expect(slide.txt).toEqual('sort');
  ssm.fillMatchingSlide(slide, save);
  expect(slide.res).toEqual(['a','b','c','d']);
})
it('slidesave', () => {
  const ss = new SlideSave(slides_test,savedata_test,new SlideSaveMethods());
  expect(ss.getCurrentSlide().res).toEqual(['a','b','c','d']);
});

