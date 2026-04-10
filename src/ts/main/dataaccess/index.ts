//datalayer mediator;
export { extend, isEqual, last } from '../index';
export { dispatch2 } from '../quiz/stateActionDispatcher';
export { explanation } from '../slide/explanation';
export { fillMatchingSlide, showSlides } from '../quiz/slideDispatcher';
export { marked } from '../index';
export type { AnswerType, SlideInterface } from '../slide/slideInterface';
export type { StateActions } from '../quiz/stateActionDispatcher';
export { getYaml2 } from './persistence/filePersistence';
export {
  WebStorageFlag,
  WebStorageVariable,
} from './persistence/webPersistence';
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
  getSaveData,
  setCourseListing,
  setSaveData,
} from './webstorage/webStorage';
