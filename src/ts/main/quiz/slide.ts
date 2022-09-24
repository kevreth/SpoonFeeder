import type { Evaluation } from './evaluate';
import type { GetScore } from './course';
import { ResultReturnType, AnswerType, Result, ResultType } from './slide/strategies/result';
import { append, empty, getSavedDataArray } from '../utilities';
import { SaveData } from '../quiz/slide/saveData';
import { mathjax } from 'mathjax-full/ts/mathjax';
import { TeX } from 'mathjax-full/ts/input/tex';
import { CHTML } from 'mathjax-full/ts/output/chtml';
import { browserAdaptor } from 'mathjax-full/ts/adaptors/browserAdaptor';
import { RegisterHTMLHandler } from 'mathjax-full/ts/handlers/html';
import hljs from 'highlight.js';
RegisterHTMLHandler(browserAdaptor());
export interface SlideInterface extends GetScore {
  type: string;
  txt: string;
  isExercise: boolean;
  pageTemplate: string;
  //Transform human-created YML into computer-friendly JSON
  //Run before quiz starts
  processJson(json: SlideInterface): void;
  //Create slide HTML during quiz
  makeSlides(doc: Document): void;
  // response():Responses;
  //Evaluate user responses at the end of quiz
  //evaluation during quiz is NOT here
  evaluate(): Evaluation;
  createPageContent(html: string, doc: Document): void;
  setResults(res:AnswerType):void;
  result(): ResultReturnType;
  get questions(): number;
  get score(): number;
}
export abstract class Slide<T extends AnswerType> implements SlideInterface {
  constructor(type:string/*, createHtml: CreateHtmlType, result: ResultType, evaluate:EvaluateType */) {
    // this.resultType = result;
    // this.evaluateStrategy = evaluate;
    // this.createHtml = createHtml;
    this.type=type;
  }
  type: string;
  //reset in every child class
  private _score = 0;
  private _questions = 0;
  public get questions(): number {
    return this._questions;
  }
  public addToQuestions(value:number): void {
    this._questions += value;
  }
  public addToScore(score:number): void {
    this._score += score;
  }
  public get score(): number {
    return this._score;
  }
  resultType: ResultType = Result.UNSUPPORTED;
  txt = '';
  ans!: T;
  res!: T;
  pageTemplate = `
        <div id="slide">
            <div id="content">
            </div>
        </div>
    `;
  isExercise = false;
  abstract processJson(json: SlideInterface): void;
  abstract makeSlides(doc: Document): void;
  abstract evaluate(): Evaluation;
  //necessary to load results from save file
  setResults(res: T): void {
    this.res=res;
  }
  createPageContent(html: string, doc: Document): void {
    const element = doc.getElementById('btn') as HTMLElement | null;
    if (element != null) element.remove(); // Removes the div with the 'div-02' id
    empty('#content');
    append('#content', html);
    this.postRendering(document);
  }
  postRendering(doc: Document) {
    hljs.highlightAll();
    const html = mathjax.document(doc, {
      InputJax: new TeX({
        inlineMath: [
          ['$', '$'],
          ['\\(', '\\)'],
        ],
        packages: ['base', 'ams', 'noundefined', 'newcommand', 'boldsymbol'],
      }),
      OutputJax: new CHTML({
        //   fontURL: 'https://cdn.rawgit.com/mathjax/mathjax-v3/3.0.0-beta.1/mathjax2/css'
      }),
    });
    html.findMath().compile().getMetrics().typeset().updateDocument();
  }
  saveData() {
    if (this.txt === '') return;
    const save = new SaveData(this.txt, this.res);
    const arr = getSavedDataArray();
    arr.push(save);
    localStorage.setItem('savedata', JSON.stringify(arr));
  }
  result(): ResultReturnType {
    return this.resultType(this.ans,this.res);
  }
  getScore(): number {
    const result = this.result();
    let count = 0;
    if(Array.isArray(result))
      count = result.filter(value => value === true).length;
    else
      count = result ? 1 : 0;
    return count;
  }
}
