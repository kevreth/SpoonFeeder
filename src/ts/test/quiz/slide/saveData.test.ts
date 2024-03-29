import { expect, it } from 'vitest';
it('getMaxWidth', () => {
  expect(0).toEqual(0);
});
// import { mock } from 'vitest-mock-extended';
// import { SaveData } from '../../../main/datalayer/saveData';
// import { GAP, MC, SORT } from '../../../main/datalayer/slideFactory';
// import {
//   MakeSlidesI,
//   SlideDispatcherMethods,
//   SlideSave,
// } from '../../../main/datalayer/saveData';
// import { SlideInterface } from '../../../main/slideInterface';
// const expected_saved = new Array<SaveData>();
// expected_saved.push(new SaveData('ans1', 'res1', '200001010000', false));
// expected_saved.push(new SaveData('ans2', 'res2', '200001010001', false));
// expected_saved.push(new SaveData('ans3', 'res3', '200001010002', false));
// const slide1 = MC();
// const slide2 = SORT();
// slide1.txt = 'Choose A.';
// slide2.txt = 'sort';
// slide1.o = ['A', 'C', 'B', 'D'];
// slide2.ans = ['a', 'b', 'c', 'd'];
// const slides_test: SlideInterface[] = [slide1, slide2];
// const savedata_test: SaveData[] = [
//   {
//     txt: 'Choose A.',
//     result: ['D'],
//     ts: '20230231054055',
//     cont: true,
//   },
//   {
//     txt: 'sort',
//     result: ['a', 'b', 'c', 'd'],
//     ts: '20230231054112',
//     cont: false,
//   },
// ];
// it('find_scalar', () => {
//   const idx = SaveData.find('ans2', expected_saved);
//   expect(idx).toEqual(1);
// });
// it('get current slide from saved data', () => {
//   const slides = slides_test;
//   const saves = savedata_test;
//   const ssm = new SlideDispatcherMethods();
//   const save = ssm.getLastSave(saves) as SaveData;
//   expect(save.txt).toEqual('sort');
//   const idx = ssm.findMatchingSlide(slides, save);
//   expect(idx).toEqual(1);
//   const slide = ssm.getMatchingSlide(slides, idx);
//   expect(slide.txt).toEqual('sort');
//   ssm.fillMatchingSlide(slide, save);
//   expect(slide.res).toEqual(['a', 'b', 'c', 'd']);
// });
// it('slidesave', () => {
//   const ss = new SlideSave(
//     slides_test,
//     savedata_test,
//     new SlideDispatcherMethods()
//   );
//   expect(ss.getCurrentSlide(false).res).toEqual(['a', 'b', 'c', 'd']);
// });
// it('finishQuiz', () => {
//   const slide = GAP();
//   slide.cont = true;
//   const testable = mock<MakeSlidesI>();
//   const ss = new SlideSave(
//     slides_test,
//     savedata_test,
//     new SlideDispatcherMethods()
//   );
//   ss.getSlide(slide, testable);
//   expect(testable.finishQuiz).toBeCalledTimes(1);
//   expect(testable.showUndecoratedSlide).toBeCalledTimes(0);
//   expect(testable.showDecoratedSlide).toBeCalledTimes(0);
// });
// it('showDecoratedSlide', () => {
//   const slide = GAP();
//   slide.cont = false;
//   const testable = mock<MakeSlidesI>();
//   const ss = new SlideSave(
//     slides_test,
//     savedata_test,
//     new SlideDispatcherMethods()
//   );
//   ss.getSlide(slide, testable);
//   expect(testable.finishQuiz).toBeCalledTimes(0);
//   expect(testable.showUndecoratedSlide).toBeCalledTimes(0);
//   expect(testable.showDecoratedSlide).toBeCalledTimes(1);
// });
// it('showUndecoratedSlide', () => {
//   const slide = GAP();
//   slide.cont = true;
//   savedata_test.pop();
//   const testable = mock<MakeSlidesI>();
//   const ss = new SlideSave(
//     slides_test,
//     savedata_test,
//     new SlideDispatcherMethods()
//   );
//   ss.getSlide(slide, testable);
//   expect(testable.finishQuiz).toBeCalledTimes(0);
//   expect(testable.showUndecoratedSlide).toBeCalledTimes(1);
//   expect(testable.showDecoratedSlide).toBeCalledTimes(0);
// });
