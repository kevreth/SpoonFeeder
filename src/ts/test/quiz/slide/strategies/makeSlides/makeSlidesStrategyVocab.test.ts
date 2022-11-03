import { expect, it } from 'vitest';
import {
  // createHtmlLoop,s
  generateQuestions,
} from '../../../../../main/quiz/slide/strategies/makeSlides/makeSlidesStrategyVocab';
import { VOCAB } from '../../../../../main/quiz/slideFactory';
sessionStorage.setItem('random', 'false');
// const DOC = new JSDOM('<!DOCTYPE html><body></body>').window.document;
const MAP: Map<string, string> = new Map([
  ['term1', 'def1'],
  ['term2', 'def2'],
  ['term3', 'def3'],
  ['term4', 'def4'],
  ['term5', 'def5'],
]);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const json: any = {
  type: 'vocab',
  list: MAP,
  isExercise: false,
};
const slide = VOCAB();
slide.processJson(json);
it('generateQuestions', () => {
  const result = generateQuestions(MAP, Array.from(MAP.values()));
  expect(result).not.toBeNull();
  expect(result.length).toBe(5);
  expect(result[0][0]).not.toBeNull();
  expect(result[0][1]).not.toBeNull();
  expect(result[0][2].length).toBe(4);
  expect(result[0][0]).toMatch(/def/);
  expect(result[0][1]).toMatch(/term/);
});
// it('createHtmlLoop', () => {
//   const vocabTuples = generateQuestions(MAP, Array.from(MAP.values()));
//   const result = createHtmlLoop(vocabTuples, CreateHtml.MC);
//   expect(result).not.toBeNull();
//   expect(result.length).toBe(5);
// });
// s

// //test that the question and 4 buttons appear
// it('includesEverything', () => {
// 	new Vocab().makeSlides2(MAP,DOC);
// 	const buttons = DOC.getElementsByTagName('button');
// 	expect(buttons.length).toBe(4);
// 	const questionId = DOC.getElementById('content');
// 	expect(questionId).not.toBeNull();
// });
// 	//test that click changes button color
// 	//we can't easily test for initial color because
// 	//it's set by style sheet and is not in the DOM
// it('correctAnswerGreen', () => {
// 	new Vocab().makeSlides2(MAP,DOC);
// 	const button = DOC.getElementById('btn0') as HTMLElement;
// 	expect(button.style.backgroundColor).to.be.empty;
// 	button.click();
// 	expect(button.style.backgroundColor).toBe('green');
// });
// //test that click changes button color
// //we can't easily test for initial color because
// //it's set by style sheet and is not in the DOM
// it('wrongAnswerRed', () => {
// 	new Vocab().makeSlides2(MAP,DOC);
// 	const button = DOC.getElementById('btn2') as HTMLElement;
// 	expect(button.style.backgroundColor).to.be.empty;
// 	button.click();
// 	expect(button.style.backgroundColor).toBe('red');
// });
// //test that event listeners have been removed
// it('eventListenersRemoved', () => {
// 	new Vocab().makeSlides2(MAP,DOC);
// 	const btn0Id = DOC.getElementById('btn0') as HTMLElement;
// 	btn0Id.click();
// 	const btn3Id = DOC.getElementById('btn3') as HTMLElement;
// 	expect(btn3Id.style.backgroundColor).to.be.empty;
// 	btn3Id.click();
// 	expect(btn3Id.style.backgroundColor).to.be.empty;
// });
// //test that continue button appears after clicking
// //an option button
// it('checkContinueButton', () => {
// 	new Vocab().makeSlides2(MAP,DOC);
// 	const btn0 = DOC.getElementById('btn0') as HTMLElement;
// 	btn0.click();
// 	const btn = DOC.getElementById('btn') as HTMLElement;
// 	expect(btn).not.toBeNull()
// });
