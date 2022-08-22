import {Evaluation} from '../evaluation';
import { Slide1 } from '../slide';
import {showButton,makeRow} from '../quiz';
import type {imap} from '../course';
import { SVGInjector } from '@tanem/svg-injector'
import { getChildIds, removeListener } from '../utilities';
export class Imap extends Slide1 {
    img = "";
    processJson(json: imap): void {
        ({txt:this.txt, img:this.img, ans:this.ans, isExercise:this.isExercise} = json);
    }
    makeSlides(doc:Document): void {
        /* eslint-disable  @typescript-eslint/no-this-alias */
        const imap = this;
        /* eslint-enable  @typescript-eslint/no-this-alias */
        const  html = this.createHtml(this.txt,this.img);
        this.createPageContent(html,doc);
        const picture = doc.getElementById('imagemap');
        //inject SVG into page so it is part of DOM
        SVGInjector(picture, {
            afterAll() {
                const ids = getChildIds(doc, "imagemap");
                ids.forEach((id) => {
                    const element = doc.getElementById(id) as HTMLElement;
                    element.addEventListener("click", ()=> {
                        ids.forEach((id) => {
                            const element = doc.getElementById(id) as HTMLElement;
                            element.classList.remove("shape");
                            removeListener(element);
                        });
                        imap.res=id;
                        const response = imap.res;
                        const element = doc.getElementById(response) as HTMLElement;
                        let classname = "shape_incorrect";
                        if (imap.result(imap.ans,response)) classname = "shape_correct";
                        element.classList.add(classname);
                        imap.saveData();
                        showButton(doc);
                    });
                });
            }
        });
    }
    createHtml(inst: string, img:string):string {
        return `${inst}<br><div id="imagemap" data-src="${img}"></div>`;
    }
    evaluate(): Evaluation {
        let correctCtr=0;
        const text = makeRow( this.txt,this.res,this.ans);
        if (this.result(this.ans,this.res)) correctCtr++;
        return new Evaluation(1, correctCtr, text);
    }
}