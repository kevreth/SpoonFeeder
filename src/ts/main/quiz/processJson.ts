import { isRandom, shuffle } from '../utilities';
import type { Course } from './course';
import { INFO, initSlide } from './slideFactory';
import type { SlideInterface } from './slideInterface';
//////////////// Phase 1: process Json
export class ProcessJson {
  public static processJson(course: Course) {
    let slides = new Array<SlideInterface>();
    ProcessJson.addNewInfoSlide(course.name, slides);
    course.units.forEach((unit, unit_ctr) => {
      const title = ProcessJson.titleSlideText('Unit', unit_ctr, unit.name);
      ProcessJson.addNewInfoSlide(title, slides);
      unit.lessons.forEach((lesson, lesson_ctr) => {
        const title = ProcessJson.titleSlideText('Lesson', lesson_ctr, lesson.name);
        ProcessJson.addNewInfoSlide(title, slides);
        lesson.modules.forEach((module, module_ctr) => {
          const title = ProcessJson.titleSlideText('Module', module_ctr, module.name);
          ProcessJson.addNewInfoSlide(title, slides);
          slides = ProcessJson.loadQuestions(slides, module.inst, false);
          if (isRandom()) module.exercises = shuffle(module.exercises);
          slides = ProcessJson.loadQuestions(slides, module.exercises, true);
        });
      });
    });
    return slides;
  }
  public static titleSlideText(type: string, counter: number, name: string) {
    counter++;
    return `${type} ${counter}:<br>${name}`;
  }
  public static loadQuestions(
    slides: Array<SlideInterface>, //the currently processed slides
    questions: Array<SlideInterface>, //raw slides to add in object notation form
    isExercise: boolean
  ): Array<SlideInterface> {
    const processedSlides = new Array<SlideInterface>();
    questions.forEach((item) => {
      item.isExercise = isExercise;
      const slides = initSlide(item);
      if (Array.isArray(slides)) processedSlides.push(...slides);
      else processedSlides.push(slides);
    });
    slides = slides.concat(processedSlides);
    return slides;
  }
  public static addNewInfoSlide(text: string, slides: SlideInterface[]) {
    const slide = INFO() as SlideInterface;
    slide.txt = text;
    slides.push(slide);
  }
}
