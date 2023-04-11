import type { Course } from './quiz/datalayer/course';
import { CourseFile, Json } from './quiz/datalayer/globals';
import { ProcessJson } from './quiz/datalayer/processJson';
import { showSlides } from './quiz/slideDispatcher';
import { getYaml, getYaml2, setCourseListing } from './utilities';
import { setCourseName } from './quiz/datalayer/globals';
export const PREFIX_COURSE_FILE = '../../../src/courses/';
const { processJson } = ProcessJson;
// necessary for adding a property to the
// DOM window object
interface Window {
  coursePath: string;
}
declare const window: Window;
export class Quiz {
  public static slides(courseName: string, doc: Document): void {
    //make the course path accessible to course files
    window.coursePath = PREFIX_COURSE_FILE + courseName + '/';
    setCourseName(courseName);
    loadCourseListing();
    const yamlFilename = Quiz.makeYamlFilename(courseName);
    loadCourse(yamlFilename, doc);
  }
  public static makeYamlFilename(courseName: string) {
    return PREFIX_COURSE_FILE.concat(courseName, '/course.yml');
  }
}
export function loadCourse(yamlFilename: string, doc: Document) {
  getYaml(yamlFilename, (course: Course) => {
    CourseFile.set(course);
    const slides = processJson(course);
    Json.set(slides);
    showSlides(doc);
  });
}
export function loadCourseListing() {
  const filename = PREFIX_COURSE_FILE + '/listing.yml';
  const listing = getYaml2<string[]>(filename);
  listing.then(list => setCourseListing(list));
}
