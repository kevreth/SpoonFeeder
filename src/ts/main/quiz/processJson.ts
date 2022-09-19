import { SlideType } from '../course';
import { shuffle, isRandom } from '../utilities';
import { info, Course } from '../course';

//////////////// Phase 1: process Json
export function processJson(course: Course) {
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
function titleSlideText(type: string, counter: number, name: string) {
  counter++;
  return `${type} ${counter}:<br>${name}`;
}
function loadQuestions(slides: Array<SlideType>, questions: Array<SlideType>, isExercise: boolean): Array<SlideType> {
  if (typeof questions !== 'undefined') {
    questions.forEach((item) => {
      item.isExercise = isExercise;
    });
    if (isRandom() && isExercise)
      questions = shuffle(questions);
    slides = slides.concat(questions);
  }
  return slides;
}
export function addNewInfoSlide(text: string, slides: SlideType[]) {
  const slide = new info();
  slide.txt = text;
  slides.push(slide);
}
