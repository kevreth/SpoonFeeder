//datalayer mediator;
export { adoc2html } from '../course/courseData/adoc2html';
export type { Course, Division, Module } from '../course/courseData/course';
export { CourseFile } from '../course/courseData/courseFile';
export { process } from '../course/courseData/courseFileProcessor';
export type { DivisionProcessor } from '../course/courseData/courseFileProcessor';
export {
  PREFIX_COURSE_FILE,
  loadCourse,
  loadCourseListing,
} from '../course/courseData/loadCourse';
export { ProcessJson } from '../course/courseData/processJson';
export { extend, isEqual, last, shuffle } from '../mediator';
export {
  INFO,
  dispatch2,
  explanation,
  fillMatchingSlide,
  initSlide,
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
  clearSessionStorage,
  getCourseListing,
  getSaveData,
  setCourseListing,
  setSaveData,
} from './webstorage/webStorage';
