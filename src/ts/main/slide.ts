import type { Evaluation } from './evaluation';
import type {SlideType} from './course';
import { extend } from './utilities';
import type { ResultReturnType, AnswerType } from './result';
import {SaveData} from './saveData';
import { SVGInjector } from '@tanem/svg-injector'
export interface SlideInterface {
    txt: string;
    isExercise:boolean;
    pageTemplate:string;
    //Transform human-created JSON into computer-friendly form
    //Run before quiz starts
    processJson(json:SlideType):void;
    //Create slide HTML during quiz
    makeSlides(doc:Document):void;
    // response():Responses;
    //Evaluate user responses at the end of quiz
    //evaluation during quiz is NOT here
    evaluate():Evaluation;
    createPageContent(html: string, doc:Document):void;
}
export abstract class Slide<T extends AnswerType>
    implements SlideInterface {
    txt="";
    subtype="";
    ans!: T;
    res!: T;
    pageTemplate = `
        <div id="header">
            <div id="inject-hamburger" data-src="../../../src/svg/hamburger.svg"></div>
        </div>
        <div id="slide">
            <div id="content">
            </div>
        </div>
    `;
    isExercise=false;
    abstract processJson(json: SlideType): void;
    abstract makeSlides(doc:Document): void;
    abstract evaluate(): Evaluation;
    abstract result(ans: T, res: T):ResultReturnType;
    createPageContent(html: string, doc:Document): void {
        doc.body.innerHTML = this.pageTemplate;
        const hamburger = document.getElementById('inject-hamburger');
        SVGInjector(hamburger, {
            beforeEach(svg) {
                svg.setAttribute("transform", "scale(.1)");
            }
        });
        const content = doc.getElementById("content") as HTMLElement;
        content.innerHTML = html;
    }
    getSaveData():SaveData {
        return new SaveData(this.txt, this.subtype, this.result(this.ans,this.res));
    }
    saveData() {
        const save = this.getSaveData();
        if(save.txt==="") return;
        const data = localStorage.getItem("savedata") as string;
        const data1 = JSON.parse(data);
        const arr:Array<SaveData> =
            extend <Array<SaveData>> (new Array<SaveData>(), data1);
        arr.push(save);
        localStorage.setItem("savedata",JSON.stringify(arr));
    }
}
//CCQ, IMAP, MC
export abstract class Slide1 extends Slide<string> {
    result(ans: string, res: string): ResultReturnType {
        return ans===res;
    }
}