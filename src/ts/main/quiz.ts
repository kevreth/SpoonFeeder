import type { SlideInterface } from './slide';
import type { SlideType } from './course';
import type { Evaluation } from './evaluation';
import { getInstance } from './slideFactory';
import { makeButton, shuffle, isRandom, getYaml, getSavedDataArray } from './utilities';
import { info, Course } from './course';
import { Globals, ROW } from './globals';
import reloadPage from '../../composables/startOver';
export enum InfoType {
  COURSE,
  UNIT,
  LESSON,
  MODULE,
}
const TABLE_HEADER =
  '<table><tr><th>Question</th><th></th><th>Your answer</th><th>Correct Answer</th></tr>';
const PREFIX_COURSE_FILE = '../../../src/courses/';
export function slides(courseName: string, doc: Document): void {
  //TODO: add test for file existence
  const yaml = PREFIX_COURSE_FILE.concat(courseName, '/course.yml');
  getYaml(yaml, (course: Course) => {
    let slides = new Array<SlideType>();
    addNewInfoSlide(course.name, slides);
    const units = course.units;
    units.forEach((unit, unit_ctr) => {
      addNewInfoSlide(
        `Unit ${unit_ctr + 1}:<br>${unit.name}`,
        slides
      );
      const lessons = unit.lessons;
      lessons.forEach((lesson, lesson_ctr) => {
        addNewInfoSlide(
          `Lesson ${lesson_ctr + 1}:<br>${lesson.name}`,
          slides
        );
        const modules = lesson.modules;
        modules.forEach((module, module_ctr) => {
          addNewInfoSlide(
            `Module ${module_ctr + 1}:<br>${module.name}`,
            slides
          );
          const inst: Array<SlideType> = module.inst;
          if (typeof inst !== 'undefined') {
            inst.forEach((item) => {
              item.isExercise = false;
            });
            slides = slides.concat(inst);
          }
          let exercises: SlideType[] = module.exercises;
          if (typeof exercises !== 'undefined') {
            exercises.forEach((item) => {
              item.isExercise = true;
            });
            if (isRandom()) exercises = shuffle(exercises);
            slides = slides.concat(exercises);
          }
          slides.filter((item) => item !== null);
        });
      });
    });
    Globals.JSON.set(processJson(slides));
    showSlides(doc);
  });
}
export function addNewInfoSlide(
  text: string,
  slides: SlideType[]
) {
  const slide = new info();
  slide.txt = text;
  slides.push(slide);
}
//////////////// Phase 1: process Json
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
///////////////// PHASE 2: make slides
export function showSlides(doc: Document): void {
  const slide = Globals.JSON.getSlide();
  const arr = getSavedDataArray();
  if (typeof slide === 'undefined') {
    //end of quiz
    doc.body.innerHTML = evaluate(); //EXECUTION ENDS
    startOverButton(doc);
  }
  //If the slide has already been presented to the user,
  //call this method again.
  //"txt" identifies slides, which may be in random order.
  else if (arr.some((x) => x.txt === slide.txt)) {
    const idx = arr.findIndex((x) => x.txt === slide.txt);
    slide.setResults(arr[idx].result);
    showSlides(doc);
  }
  else slide.makeSlides(doc);
}
function startOverButton(doc: Document) {
  const startOverText = makeButton('startOver', 'startOver', 'Start Over');
  doc.body.insertAdjacentHTML('beforeend', '<br>' + startOverText);
  const startOver = document.getElementById('startOver') as HTMLElement;
  startOver.addEventListener('click', () => {
    reloadPage();
  });
}
export function showButton(doc: Document): void {
  const continue_btn = continueButton(doc);
  continue_btn?.addEventListener('click', (): void => {
    showSlides(doc);
  });
}
export function continueButton(doc: Document) {
  const button = makeButton('btn', 'continue-button', 'continue');
  const slide = doc.getElementById('slide') as HTMLElement;
  slide.insertAdjacentHTML('beforeend', button);
  const continue_btn = doc.getElementById('btn') as HTMLElement;
  continue_btn.style.position = 'absolute';
  continue_btn.style.marginTop = 10 + 'px';
  continue_btn.style.marginLeft = -2.3 + 'em';
  return continue_btn;
}
//////////////// Phase 3: evaluate
function summary(responseCtr: number, correctCtr: number) {
  const pctCorrect = percentCorrect(correctCtr, responseCtr);
  return `NUMBER OF QUESTIONS: ${responseCtr}<br>\nNUMBER CORRECT: ${correctCtr}<br>\nPERCENT CORRECT: ${pctCorrect}%`;
}
export function percentCorrect(
  correctCtr: number,
  responseCtr: number
): string {
  return ((correctCtr / responseCtr) * 100).toFixed(0);
}
function evaluate(): string {
  Globals.JSON.reset();
  let text = TABLE_HEADER;
  let correctCtr = 0;
  let responseCtr = 0;
  for (let i = 0; i < Globals.JSON.getNumSlides(); i++) {
    const slide = Globals.JSON.getSlide();
    if (!slide.isExercise) continue;
    const evaluation: Evaluation = slide.evaluate();
    responseCtr += evaluation.responses;
    correctCtr += evaluation.correct;
    text = text.concat(evaluation.text);
  }
  text = text.concat('</table>');
  text = text.concat(summary(responseCtr, correctCtr));
  for (let i = 1; i < responseCtr + 1; i++) {
    text = text.replace('%N%', i.toString());
  }
  return text;
}
export function makeRow(question: string, response: string, answer: string) {
  let text = ROW;
  text = text.replace('%Q%', question);
  text = text.replace('%A%', response);
  text = text.replace('%C%', answer);
  return text;
}
