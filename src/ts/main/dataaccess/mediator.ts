//datalayer mediator;
export { adoc2html } from './courseData/adoc2html';
export type { Course, Division } from './courseData/course';
export { process } from './courseData/courseFileProcessor';
export type { DivisionProcessor } from './courseData/courseFileProcessor';
export { PREFIX_COURSE_FILE, loadCourse } from './courseData/loadCourse';
export { SaveData } from './saveData/saveData';
export { Json } from './saveData/saveFile';
export {
  COURSES,
  COURSE_NAME,
  MUTE,
  RANDOM,
  TRANSITION,
  clearRandom,
  clearSessionStorage,
  getCourseListing, getSaveData, isRandom,
  setCourseListing, setSaveData
} from './webstorage/webStorage';

