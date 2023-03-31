import { expect, it } from 'vitest';
import { SaveData } from '../../../main/quiz/datalayer/saveData';
import { Course } from 'app/main/quiz/datalayer/course';
const expected_saved = new Array<SaveData>();
expected_saved.push(new SaveData('ans1', 'res1', '200001010000', false));
expected_saved.push(new SaveData('ans2', 'res2', '200001010001', false));
expected_saved.push(new SaveData('ans3', 'res3', '200001010002', false));
// const coursedata: Course =
// {
//   name: 'course 1',
//   units: [
//     {
//       name: 'unit 1',
//       lessons: [
//         {
//           name: 'lesson 1',
//           modules: [
//             {
//               name: 'module 1',
//               inst: [],
//               exercises: [
//                 {
//                   type: 'mc',
//                   txt: 'Choose A.',
//                   o: ['A','C','B','D']
//                 },
//                 {
//                   type: 'sort',
//                   txt: 'sort',
//                   ans: ['a','b','c','d']}]}]}]}]}
// const savedata =
// [
//   {
//     txt: 'Choose A.',
//     result: ['D'],
//     ts: '20230231054055',
//     cont: true
//   },
//   {
//     txt: 'sort',
//     result: ['a','b','c','d'],
//     ts: '20230231054112',
//     cont: false
//   }
// ]
it('find_scalar', () => {
  const idx = SaveData.find('ans2', expected_saved);
  expect(idx).toEqual(1);
});
// it('get current slide from saved data', () => {

// })
