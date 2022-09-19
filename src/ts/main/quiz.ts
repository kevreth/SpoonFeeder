import type { SlideInterface } from './slide';
import type { SlideType } from './course';
import { getInstance } from './slideFactory';
import { shuffle, isRandom, getYaml } from './utilities';
import { info, Course } from './course';
import { Globals } from './globals';
import { showSlides } from './quiz/makeSlides';
const PREFIX_COURSE_FILE = '../../../src/courses/';
export function slides(courseName: string, doc: Document): void {
  // Phase 1: process Json
  // Phase 2: process Json
  // PHASE 3: make slides
  // Phase 4: evaluate
  //TODO: add test for file existence
  const yaml = PREFIX_COURSE_FILE.concat(courseName, '/course.yml');
  getYaml(yaml, (course: Course) => {
    const slides = processSlides(course);
    Globals.JSON.set(processJson(slides));
    showSlides(doc);
  });
}
//////////////// Phase 1: process Json
function processSlides(course: Course) {
  let slides = new Array<SlideType>();
  addNewInfoSlide(course.name, slides);
  course.units.forEach((unit, unit_ctr) => {
    addNewInfoSlide(titleSlideText('Unit', unit_ctr, unit.name), slides);
    unit.lessons.forEach((lesson, lesson_ctr) => {
      addNewInfoSlide(titleSlideText('Lesson', lesson_ctr, lesson.name), slides);
      lesson.modules.forEach((module, module_ctr) => {
        addNewInfoSlide(titleSlideText('Module', module_ctr, module.name), slides);
        slides = loadQuestions(slides, module.inst, false);
        slides = loadQuestions(slides, module.exercises, true);
      });
    });
  });
  return slides;
}

function titleSlideText(type: string, counter: number, name:string) {
  counter++;
  return `${type} ${counter}:<br>${name}`;
}
function loadQuestions(slides: Array<SlideType>, questions: Array<SlideType>, isExercise: boolean): Array<SlideType> {
  if (typeof questions !== 'undefined') {
    questions.forEach((item) => {
      item.isExercise = isExercise;
    });
    if (isRandom() && isExercise) questions = shuffle(questions);
    slides = slides.concat(questions);
  }
  return slides;
}
export function addNewInfoSlide(text: string, slides: SlideType[]) {
  const slide = new info();
  slide.txt = text;
  slides.push(slide);
}
//////////////// Phase 2: process Json
export function processJson(data: Array<SlideType>): Array<SlideInterface> {
  const outJson: Array<SlideInterface> = new Array<SlideInterface>();
  Array.prototype.forEach.call(data, (currentQuestion: SlideType) => {
    const slide = getInstance(currentQuestion.type) as SlideInterface;
    slide.processJson(currentQuestion);
    outJson.push(slide);
  });
  Globals.JSON.reset();
  return outJson;
}

