import { Progress } from '../../composables/progress';
import { Json } from './globals';
import type { Course } from './quiz/course';
import { MakeSlides } from './quiz/makeSlides';
import { ProcessJson } from './quiz/processJson';
import { getYaml } from './utilities';
const PREFIX_COURSE_FILE = '../../../src/courses/';
const { processJson } = ProcessJson;
export class Quiz {
  public static slides(courseName: string, doc: Document): void {
    // Phase 1: process Json
    // Phase 3: make slides
    // Phase 4: evaluate
    //TODO: add test for file existence
    const yamlFilename = Quiz.makeYamlFilename(courseName);
    //test data
    Progress.data = [
      {
        label: 'test 1',
        description: 'test 1 description data',
        note: 'test 1 note',
        children: [],
      },
    ];
    getYaml(yamlFilename, (course: Course) => {
      const slides = processJson(course);
      Json.set(slides);
      MakeSlides.showSlides(doc);
    });
  }
  public static makeYamlFilename(courseName: string) {
    return PREFIX_COURSE_FILE.concat(courseName, '/course.yml');
  }
}
