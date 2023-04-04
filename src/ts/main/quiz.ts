import type { Course } from './quiz/datalayer/course';
import { CourseFile, Json } from './quiz/datalayer/globals';
import { ProcessJson } from './quiz/datalayer/processJson';
import { showSlides } from './quiz/slideDispatcher';
import { getYaml, setCourseListing } from './utilities';
import { setCourseName } from './quiz/datalayer/globals';
const PREFIX_COURSE_FILE = '../../../src/courses/';
const { processJson } = ProcessJson;
export class Quiz {
  public static slides(courseName: string, doc: Document): void {
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
