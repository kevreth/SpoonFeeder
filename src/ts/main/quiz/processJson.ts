import { isRandom, shuffle } from '../utilities';
import type { Course } from './course';
import { getInstance, INFO } from './slide/slideFactory';
import type { SlideInterface } from './slideInterface';
//////////////// Phase 1: process Json
export class ProcessJson {
  public static processJson(course: Course) {
    let slides = new Array<SlideInterface>();
    ProcessJson.addNewInfoSlide(course.name, slides);
    course.units.forEach((unit, unit_ctr) => {
      ProcessJson.addNewInfoSlide(
        ProcessJson.titleSlideText('Unit', unit_ctr, unit.name),
        slides
      );
      unit.lessons.forEach((lesson, lesson_ctr) => {
        ProcessJson.addNewInfoSlide(
          ProcessJson.titleSlideText('Lesson', lesson_ctr, lesson.name),
          slides
        );
        lesson.modules.forEach((module, module_ctr) => {
          ProcessJson.addNewInfoSlide(
            ProcessJson.titleSlideText('Module', module_ctr, module.name),
            slides
          );
          slides = ProcessJson.loadQuestions(slides, module.inst, false);
          slides = ProcessJson.loadQuestions(slides, module.exercises, true);
        });
      });
    });
    return slides;
  }
  private static titleSlideText(type: string, counter: number, name: string) {
    counter++;
    return `${type} ${counter}:<br>${name}`;
  }
  private static loadQuestions(
    slides: Array<SlideInterface>, //the currently processed slides
    questions: Array<SlideInterface>, //raw slides to add in object notation form
    isExercise: boolean
  ): Array<SlideInterface> {
    if (typeof questions !== 'undefined') {
      const processedSlides = new Array<SlideInterface>();
      questions.forEach((item) => {
        item.isExercise = isExercise;
        const slide = getInstance(item.type) as SlideInterface;
        slide.processJson(item);
        processedSlides.push(slide);
      });
      if (isRandom() && isExercise) questions = shuffle(questions);
      slides = slides.concat(processedSlides);
    }
    return slides;
  }
  private static addNewInfoSlide(text: string, slides: SlideInterface[]) {
    const slide = INFO() as SlideInterface;
    slide.txt = text;
    slides.push(slide);
  }
}
