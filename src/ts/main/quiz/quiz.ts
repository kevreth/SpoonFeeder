import { COURSE_NAME, RANDOM, TRANSITION, clearCourseListing } from '../dataaccess/webstorage/webStorage';
import { PREFIX_COURSE_FILE, loadCourse } from '../course/courseData/loadCourse';
// necessary for adding a property to the
// DOM window object
interface Window {
  coursePath: string;
  courseName: string;
}
declare const window: Window;
export function switchCourse(courseName: string) {
  clearCourseListing();
  RANDOM.clear();
  TRANSITION.clear();
  COURSE_NAME.set(courseName);
  //make the course path accessible to course files
  window.courseName = courseName;
  window.coursePath = PREFIX_COURSE_FILE + courseName + '/';
  Quiz.slides(courseName, document);
}
export class Quiz {
  public static slides(courseName: string, doc: Document): void {
    //make the course path accessible to course files
    window.coursePath = PREFIX_COURSE_FILE + courseName + '/';
    COURSE_NAME.set(courseName);
    const yamlFilename = Quiz.makeYamlFilename(courseName);
    loadCourse(yamlFilename, doc);
  }
  public static makeYamlFilename(courseName: string) {
    return PREFIX_COURSE_FILE.concat(courseName, '/course.yml');
  }
}
