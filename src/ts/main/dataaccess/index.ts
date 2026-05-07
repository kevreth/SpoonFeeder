//datalayer mediator;
export { extend, isEqual, last } from '../index';
export { dispatch2, getQuizState } from '../quiz/stateActionDispatcher';
export { explanation } from '../slide/explanation';
export { fillMatchingSlide, showSlides } from '../quiz/slideDispatcher';
export { marked } from '../index';
export type { AnswerType, SlideInterface } from '../slide/slideInterface';
export type { StateActions, QuizState } from '../quiz/stateActionDispatcher';
export { getYaml2 } from './persistence/filePersistence';
export { timestampNow } from './saveData/date';
export { SaveData } from './saveData/saveData';
export { Json } from './saveData/saveFile';
export { SaveDataDispatcher } from './saveData/slideDispatcher2';
export {
  COURSE_NAME,
  MUTE,
  RANDOM,
  TRANSITION,
  clearCourseListing,
  getCourseListing,
  setCourseListing,
  clearSessionStorage,
} from './webstorage/webStorage';
