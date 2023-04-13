import type { AdocVisitorInterface } from './courseData/adocVisitor';
import { AdocVisitor } from './courseData/adocVisitor'
import type { Course, Division } from './courseData/course';
import { ProcessJson } from './courseData/processJson';
import { Json } from './saveData/saveFile';
import { CourseFile } from './courseData/courseFile';
import { PREFIX_COURSE_FILE, loadCourse } from './courseData/loadCourse';
import type { DivisionProcessor } from './courseData/courseFileProcessor';
import { process } from './courseData/courseFileProcessor';
import { SaveData } from './saveData/saveData';
import { isMute, isRandom, setCourseName,clearRandom } from './webstorage/webStorage';
import { clearSessionStorage } from './persistence/webPersistence';

export {
  PREFIX_COURSE_FILE,
  Course,
  Division,
  AdocVisitorInterface,
  ProcessJson,
  CourseFile,
  Json,
  SaveData,
  DivisionProcessor,
  AdocVisitor,
  loadCourse,
  process,
  setCourseName,
  isRandom,
  isMute,
  clearRandom,
  clearSessionStorage
}
