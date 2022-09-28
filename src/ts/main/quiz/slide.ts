import type { Evaluation } from './evaluate';

import { ResultReturnType, AnswerType, ResultType } from './slide/strategies/result';
import { append, empty } from '../utilities';
import { SaveData } from '../quiz/slide/saveData';
import { mathjax } from 'mathjax-full/ts/mathjax';
import { TeX } from 'mathjax-full/ts/input/tex';
import { CHTML } from 'mathjax-full/ts/output/chtml';
import { browserAdaptor } from 'mathjax-full/ts/adaptors/browserAdaptor';
import { RegisterHTMLHandler } from 'mathjax-full/ts/handlers/html';
import { EvaluateType } from './slide/strategies/evaluate';
import { MakeSlidesType } from './slide/strategies/makeSlides';
import hljs from 'highlight.js';
import { CreateHtmlTypeIntersection } from './slide/strategies/createHtml';
const {saveData} = SaveData;
RegisterHTMLHandler(browserAdaptor());
type AnswerTypeIntersection = string & string[];
type ResultTypeIntersection = boolean & boolean[];
export interface SlideInterface/* extends GetScore*/ {
  txt: AnswerType;
  type: string;
  isExercise: boolean;
  pageTemplate: string;
  //Transform human-created YML into computer-friendly JSON
  //Run before quiz starts
  processJson(json: SlideInterface): void;
  //Create slide HTML during quiz
  makeSlides(doc: Document): void;
  //Evaluate user responses at the end of quiz
  //evaluation during quiz is NOT here
  evaluate(): Evaluation;
  setResults(res:AnswerType):void;
  result(): ResultReturnType;
}
export abstract class Slide<T extends AnswerType> implements SlideInterface {
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
  constructor(
    public readonly type: string,
    public readonly createHtml: CreateHtmlTypeIntersection,
    public readonly makeSlidesStrategy:MakeSlidesType,
    public readonly evaluateStrategy:EvaluateType,
    public readonly resultType: ResultType
  ) {}
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
  setRes(res:T):void {
    this.res=res;
  }
  getSetValues() {
    const saveData = () => this.saveData();
    const result = (): ResultReturnType => this.result();
    const setRes = (res:T): void => this.setRes(res);
    return new SetValues<T>(saveData, result, setRes);
  }
}
export class SetValues<T> {
  constructor (
    public readonly saveData: () => void,
    public readonly result: () => ResultReturnType,
    public readonly setRes: (res:T) => void,
  ) {}
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
