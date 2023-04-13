import type { AdocVisitorInterface } from './courseData/adocVisitor';
import { AdocVisitor } from './courseData/adocVisitor'
import type { Course, Division } from './courseData/course';
import { ProcessJson } from './courseData/processJson';
import { CourseFile, Json } from './globals';
import { PREFIX_COURSE_FILE, loadCourse } from './courseData/loadCourse';
import type { DivisionProcessor } from './courseData/courseFileProcessor';
import { process } from './courseData/courseFileProcessor';
import { SaveData } from './saveData/saveData';
import { isMute, isRandom, setCourseName } from './webStorage';

export {
  Course,
  Division,
  AdocVisitorInterface,
  ProcessJson,
  CourseFile,
  Json,
  PREFIX_COURSE_FILE,
  loadCourse,
  process,
  SaveData,
  DivisionProcessor,
  AdocVisitor,
  setCourseName,
  isRandom,
  isMute
}
