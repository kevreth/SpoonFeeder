import {
  COURSE_NAME,
  PREFIX_COURSE_FILE,
  RANDOM,
  TRANSITION,
  clearCourseListing,
  loadCourse,
} from './mediator';
// necessary for adding a property to the
// DOM window object
interface Window {
  coursePath: string;
  courseName: string;
}
declare const window: Window;
export function switchCourse(courseName: string) {
  clearCourseListing();
  //===========================================================================
  // un-comment for TESTING
  RANDOM.clear();
  TRANSITION.clear();
  //===========================================================================
  COURSE_NAME.set(courseName);
  //make the course path accessible to course files
  window.courseName = courseName;
  window.coursePath = PREFIX_COURSE_FILE + courseName + '/';
  try {
    Quiz.slides(courseName, document);
  }
  catch (err) {
    console.error('Error in Quiz.slides:', err)
  }
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
