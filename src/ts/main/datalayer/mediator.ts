import type { AdocVisitorInterface } from '../slidetype/misc/adocVisitor';
import { AdocVisitor } from '../slidetype/misc/adocVisitor';
import type { Course, Division } from './courseData/course';
import type { DivisionProcessor } from './courseData/courseFileProcessor';
import { process } from './courseData/courseFileProcessor';
import { PREFIX_COURSE_FILE, loadCourse } from './courseData/loadCourse';
import { clearSessionStorage } from './persistence/webPersistence';
import { SaveData } from './saveData/saveData';
import { Json } from './saveData/saveFile';
import {
  clearRandom,
  isMute,
  isRandom,
  setCourseName,
} from './webstorage/webStorage';

export type { Course, Division, AdocVisitorInterface, DivisionProcessor };
export {
  PREFIX_COURSE_FILE,
  Json,
  SaveData,
  AdocVisitor,
  loadCourse,
  process,
  setCourseName,
  isRandom,
  isMute,
  clearRandom,
  clearSessionStorage,
};

