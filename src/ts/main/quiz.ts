import { CourseFile, Json } from './quiz/datalayer/globals';
import type { Course } from './quiz/datalayer/course';
import { MakeSlides } from './quiz/makeSlides';
import { ProcessJson } from './quiz/datalayer/processJson';
import { getYaml } from './utilities';
const PREFIX_COURSE_FILE = '../../../src/courses/';
const { processJson } = ProcessJson;
export class Quiz {
  public static slides(courseName: string, doc: Document): void {
    // Phase 1: process Json
    // Phase 2: make slides
    // Phase 3: evaluate
    //TODO: add test for file existence
    const yamlFilename = Quiz.makeYamlFilename(courseName);
    //test data
    getYaml(yamlFilename, (course: Course) => {
      CourseFile.set(course);
      const slides = processJson(course);
      Json.set(slides);
      MakeSlides.showSlides(doc);
    });
  }
  public static makeYamlFilename(courseName: string) {
    return PREFIX_COURSE_FILE.concat(courseName, '/course.yml');
  }
}
