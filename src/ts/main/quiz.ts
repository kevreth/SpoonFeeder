import type {SaveData} from './saveData';
import {getInstance} from './slideFactory';
import type {SlideInterface} from './slide';
import {ajax, extend, makeButton, shuffle, isRandom} from "./utilities";
import {info,Course} from './course';
import type {SlideType} from './course';
import {Globals, ROW} from './globals';
import type {Evaluation} from './evaluation';
export enum InfoType {COURSE, UNIT, LESSON, MODULE}
const TABLE_HEADER = '<table><tr><th>Question</th><th></th><th>Your answer</th><th>Correct Answer</th></tr>';
export function slides(file:string, doc:Document): void {
    ajax(file, (course:Course) => {
        let slides = new Array<SlideType>();
        addNewInfoSlide(course.name,InfoType.COURSE,slides);
        const units = course.units;
        units.forEach((unit, unit_ctr) => {
            addNewInfoSlide(`Unit ${unit_ctr+1}:<br>${unit.name}`,InfoType.UNIT,slides);
            const lessons = unit.lessons;
            lessons.forEach((lesson, lesson_ctr) => {
                addNewInfoSlide(`Lesson ${lesson_ctr+1}:<br>${lesson.name}`,InfoType.LESSON,slides);
                const modules = lesson.modules;
                modules.forEach((module, module_ctr) => {
                    addNewInfoSlide(`Module ${module_ctr+1}:<br>${module.name}`,InfoType.MODULE,slides);
                    const inst:Array<SlideType> = module.inst;
                    if(typeof inst !== 'undefined') {
                        inst.forEach((item)=>{
                            item.isExercise = false;
                        });
                        slides = slides.concat(inst);
                    }
                    let exercises:SlideType[] = module.exercises;
                    if(typeof exercises !== 'undefined') {
                        exercises.forEach((item)=>{
                            item.isExercise = true;
                        });
                        if(isRandom()) exercises = shuffle(exercises);
                        slides = slides.concat(exercises);
                    }
                    slides.filter(item => item !== null)
                });
            });
        });
        Globals.JSON.set(processJson(slides));
        showSlides(doc);
    });
}
export function addNewInfoSlide(text: string,type:InfoType, slides: SlideType[]) {
    const slide = new info();
    slide.txt=text;
    slide.subtype=InfoType[type].toString();
    slides.push(slide);
}
//////////////// Phase 1: process Json
export function processJson(data:Array<SlideType>):Array<SlideInterface> {
    const outJson:Array<SlideInterface> = new Array<SlideInterface>();
    Array.prototype.forEach.call(data, currentQuestion => {
        const slide = getInstance(currentQuestion.type) as SlideInterface;
        slide.processJson(currentQuestion);
        outJson.push(slide);
    })
    Globals.JSON.reset();
    return outJson;
}
///////////////// PHASE 2: make slides
export function showSlides(doc:Document):void {
    const slide = Globals.JSON.getSlide();
    const data = localStorage.getItem("savedata") as string;
    const data1 = JSON.parse(data);
    const arr:Array<SaveData> = extend <Array<SaveData>> (new Array<SaveData>(), data1);
    if (typeof slide === 'undefined') {//end of quiz
        doc.body.innerHTML = evaluate(); //EXECUTION ENDS
    }
    else if (arr.some(x => x.txt === slide.txt))
        showSlides(doc);
    else slide.makeSlides(doc);
}
export function showButton(doc:Document):void {
    const continue_btn = continueButton(doc);
    // continue_btn.style.visibility = "hidden";
    // continue_btn.style.transform = "translate(-50%, 0)";
    // continue_btn.style.visibility = "visible";
    continue_btn?.addEventListener('click', ():void => {showSlides(doc)});
}
export function continueButton(doc: Document) {
    const button = makeButton("btn", "continue-button", "continue");
    doc.body.insertAdjacentHTML('beforeend', "<br>" + button);
    const continue_btn = doc.getElementById("btn") as HTMLElement;
    const elem = doc.getElementById('content') as HTMLElement|null;
    //necessary null check on "elem" because sort.ts does not have #content
    //until refactoring.
    if(elem !=null) {
        const rect = elem.getBoundingClientRect();
        const bottom = rect.bottom;
        continue_btn.style.position = "relative";
        continue_btn.style.top = bottom + 15 + "px";
        continue_btn.style.right = "auto";
    }
    return continue_btn;
}

//////////////// Phase 3: evaluate
function summary(responseCtr:number, correctCtr:number) {
    const pctCorrect = percentCorrect(correctCtr, responseCtr);
    return `NUMBER OF QUESTIONS: ${responseCtr}<br>\nNUMBER CORRECT: ${correctCtr}<br>\nPERCENT CORRECT: ${pctCorrect}%`;
}
export function percentCorrect(correctCtr:number, responseCtr:number):string {
    return ((correctCtr / responseCtr) * 100).toFixed(0);
}
function evaluate():string {
    Globals.JSON.reset();
    let text = TABLE_HEADER;
    let correctCtr = 0;
    let responseCtr = 0;
    for(let i=0; i<Globals.JSON.getNumSlides(); i++) {
        const slide = Globals.JSON.getSlide();
        //this should be negated, unsure why works this way.
        //want to continue for non-exercises
        if(!slide.isExercise) continue;
        const evaluation:Evaluation = slide.evaluate();
        responseCtr += evaluation.responses;
        correctCtr += evaluation.correct;
        text = text.concat(evaluation.text);
    }
    text = text.concat("</table>");
    text = text.concat(summary(responseCtr, correctCtr));
    for(let i=1; i<responseCtr+1; i++) {
        text = text.replace("%N%", i.toString());
    }
    return text;
}
export function makeRow(question:string, response: string, answer:string) {
    let text = ROW;
    text = text.replace('%Q%', question);
    text = text.replace('%A%', response);
    text = text.replace('%C%', answer);
    return text;
}