import {
  CourseFile,
  Json,
  ProcessJson,
  getYaml2,
  showSlides,
} from '../mediator';
import type {Course} from '../mediator';
export const PREFIX_COURSE_FILE = '../../../src/courses/';
const LISTING_FILE_NAME = PREFIX_COURSE_FILE + '/listing.yml';
export function loadCourse(yamlFilename: string, doc: Document) {
  const load = (course: Course) => {
    CourseFile.set(course);
    const slides = ProcessJson.processJson(course);
    Json.set(slides);
    showSlides(doc);
  };
  loadFile(yamlFilename, load);
}
export function loadFile<T>(filename: string, f: (data: T) => void) {
  getYaml2<T>(filename).then((list) => f(list));
}
export function loadCourseListing(f: (data: string[]) => void) {
  loadFile<string[]>(LISTING_FILE_NAME, f);
}
