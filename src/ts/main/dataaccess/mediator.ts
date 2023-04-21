//datalayer mediator;
export {
  extend,
  isEqual,
  last,
  shuffle
} from '../mediator';
export {
  INFO,
  dispatch2,
  explanation,
  fillMatchingSlide,
  initSlide,
  marked,
  showSlides
} from '../quiz/mediator';
export type {
  AnswerType,
  SlideInterface,
  StateActions
} from '../quiz/mediator';
export { adoc2html } from './courseData/adoc2html';
export type { Course, Division, Module } from './courseData/course';
export { CourseFile } from './courseData/courseFile';
export { process } from './courseData/courseFileProcessor';
export type { DivisionProcessor } from './courseData/courseFileProcessor';
export {
  PREFIX_COURSE_FILE,
  loadCourse,
  loadCourseListing
} from './courseData/loadCourse';
export { ProcessJson } from './courseData/processJson';
export { getYaml2 } from './persistence/filePersistence';
export {
  WebStorageFlag,
  WebStorageVariable
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
  clearSessionStorage,
  getCourseListing,
  getSaveData,
  setCourseListing,
  setSaveData
} from './webstorage/webStorage';

