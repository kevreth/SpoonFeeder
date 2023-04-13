import { PREFIX_COURSE_FILE, clearRandom, clearSessionStorage, loadCourse, setCourseName } from './quiz/datalayer/mediator';
// necessary for adding a property to the
// DOM window object
interface Window {
  coursePath: string;
  courseName: string;
}
declare const window: Window;
export function switchCourse(courseName: string) {
  clearSessionStorage();
  //===========================================================================
  // un-comment for TESTING
  clearRandom()
  //===========================================================================
  setCourseName(courseName);
  //make the course path accessible to course files
  window.courseName = courseName;
  window.coursePath = PREFIX_COURSE_FILE + courseName + '/';
  Quiz.slides(courseName, document);
}
export class Quiz {
  public static slides(courseName: string, doc: Document): void {
    //make the course path accessible to course files
    window.coursePath = PREFIX_COURSE_FILE + courseName + '/';
    setCourseName(courseName);
    const yamlFilename = Quiz.makeYamlFilename(courseName);
    loadCourse(yamlFilename, doc);
  }
  public static makeYamlFilename(courseName: string) {
    return PREFIX_COURSE_FILE.concat(courseName, '/course.yml');
  }
}

