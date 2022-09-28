import type { Evaluation } from './evaluate';
import type { GetScore } from './course';
import { ResultReturnType, AnswerType, ResultType } from './slide/strategies/result';
import { append, empty } from '../utilities';
import { saveData } from '../quiz/slide/saveData';
import { mathjax } from 'mathjax-full/ts/mathjax';
import { TeX } from 'mathjax-full/ts/input/tex';
import { CHTML } from 'mathjax-full/ts/output/chtml';
import { browserAdaptor } from 'mathjax-full/ts/adaptors/browserAdaptor';
import { RegisterHTMLHandler } from 'mathjax-full/ts/handlers/html';
import { EvaluateType } from './slide/strategies/evaluate';
import { MakeSlidesType } from './slide/strategies/makeSlides';
import hljs from 'highlight.js';
RegisterHTMLHandler(browserAdaptor());
type AnswerTypeIntersection = string & string[];
type ResultTypeIntersection = boolean & boolean[];
export interface SlideInterface extends GetScore {
  type: string;
  txt: AnswerType;
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
  setResults(res:AnswerType):void;
  result(): ResultReturnType;
  get questions(): number;
  get score(): number;
}
export abstract class Slide<T extends AnswerType> implements SlideInterface {
  constructor(type:string,makeSlidesStrategy:MakeSlidesType, evaluateStrategy:EvaluateType, result: ResultType/*, createHtml: CreateHtmlType, */) {
    this.evaluateStrategy = evaluateStrategy;
    this.resultType = result;
    this.makeSlidesStrategy = makeSlidesStrategy;
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
  resultType: ResultType;
  makeSlidesStrategy: MakeSlidesType;
  evaluateStrategy:EvaluateType;
  txt!: AnswerType;
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
  //necessary to load results from save file
  setResults(res: T): void {
    this.res=res;
  }
  evaluate(): Evaluation {
    const txt = (this.txt as AnswerTypeIntersection);
    const res = (this.res as AnswerTypeIntersection);
    const ans = (this.ans as AnswerTypeIntersection);
      const result = (this.result() as ResultTypeIntersection);
    return this.evaluateStrategy(txt, ans, res, result);
  }
  saveData() {
    const txt = this.txt;
    const res = this.res;
    saveData(txt, res);
  }
  result(): ResultReturnType {
    return this.resultType(this.ans,this.res);
  }
  //not in use yet; used to calculate scores for divisions
  getScore(): number {
    const result = this.result();
    let count = 0;
    if(Array.isArray(result))
      count = result.filter(value => value === true).length;
    else
      count = result ? 1 : 0;
    return count;
  }
  setRes(res:T):void {
    this.res=res;
  }
  getSetValues() {
    const saveData = () => this.saveData();
    const result = (): ResultReturnType => this.result();
    const setRes = (res:T): void => this.setRes(res);
    // const createPageContent = (html: string, doc: Document): void => createPageContent(html,doc);
    return new SetValues<T>(saveData, result, setRes/*, createPageContent*/);
  }
}
export class SetValues<T> {
  constructor (
    saveData: () => void,
    result: () => ResultReturnType,
    setRes: (res:T) => void,
    // createPageContent: (html: string, doc: Document) => void
  ) {
    this.saveData = saveData;
    this.result = result;
    this.setRes = setRes;
    // this.createPageContent = createPageContent;
  }
  public saveData: () => void;
  public result: () => ResultReturnType;
  public setRes: (res:T) => void;
  // public createPageContent: (html: string, doc: Document) => void
}
export function createPageContent(html: string, doc: Document): void {
  const element = doc.getElementById('btn') as HTMLElement | null;
  if (element != null) element.remove(); // Removes the div with the 'div-02' id
  empty('#content');
  append('#content', html);
  postRendering(document);
}
function postRendering(doc: Document) {
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
