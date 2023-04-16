//datalayer mediator;
export type { Course, Division } from './courseData/course';
export { process } from './courseData/courseFileProcessor';
export type { DivisionProcessor } from './courseData/courseFileProcessor';
export { PREFIX_COURSE_FILE, loadCourse } from './courseData/loadCourse';
export { clearSessionStorage } from './persistence/webPersistence';
export { SaveData } from './saveData/saveData';
export { Json } from './saveData/saveFile';
export {
  clearRandom,
  isMute,
  isRandom,
  setCourseName
} from './webstorage/webStorage';

