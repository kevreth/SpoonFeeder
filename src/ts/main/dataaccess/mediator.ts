//datalayer mediator;
export { extend, isEqual, last } from '../mediator';
export {
  dispatch2,
  explanation,
  fillMatchingSlide,
  marked,
  showSlides,
} from '../quiz/mediator';
export type {
  AnswerType,
  SlideInterface,
  StateActions,
} from '../quiz/mediator';
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
