import type { Course } from './quiz/datalayer/course';
import { CourseFile, Json } from './quiz/datalayer/globals';
import { ProcessJson } from './quiz/datalayer/processJson';
import { showSlides } from './quiz/slideDispatcher';
import { getYaml, setCourseListing } from './utilities';
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
    const yamlFilename = Quiz.makeYamlFilename(courseName);
    getYaml(PREFIX_COURSE_FILE + '/listing.yml', (listing: Array<string>) => {
      setCourseListing(listing);
    });
    getYaml(yamlFilename, (course: Course) => {
      CourseFile.set(course);
      const slides = processJson(course);
      Json.set(slides);
      showSlides(doc);
    });
  }
  public static makeYamlFilename(courseName: string) {
    return PREFIX_COURSE_FILE.concat(courseName, '/course.yml');
  }
}
