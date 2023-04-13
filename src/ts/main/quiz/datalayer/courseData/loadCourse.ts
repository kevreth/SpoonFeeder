import type { Course } from './course';
import { CourseFile, Json } from '../globals';
import { showSlides } from '../../slideDispatcher';
import { getYaml2, getYaml } from '../fileUtilties';
export const PREFIX_COURSE_FILE = '../../../src/courses/';
import { ProcessJson } from './processJson';
const { processJson } = ProcessJson;
export const LISTING_FILE_NAME = PREFIX_COURSE_FILE + '/listing.yml';
export function loadCourse(yamlFilename: string, doc: Document) {
  getYaml(yamlFilename, (course: Course) => {
    CourseFile.set(course);
    const slides = processJson(course);
    Json.set(slides);
    showSlides(doc);
  });
}
export function loadFile<T>(filename: string, f: (data: T) => void) {
  getYaml2<T>(filename).then(list => f(list));
}
export function loadCourseListing(f: (data: string[]) => void) {
  loadFile<string[]>(LISTING_FILE_NAME, f);
}
