import { isEqual, timestampNow } from '../utilities';
import type { Evaluation } from './evaluate';
// import { exerciseGroupSlideIndex } from './exerciseGroup';
import { SaveData } from './slide/saveData';
// import { SetValues } from './slide/setValues';
import type { CreateHtmlTypeIntersection } from './slide/strategies/createHtmlStrategy';
import type { EvaluateType } from './slide/strategies/evaluateStrategy';
import type { MakeSlidesType } from './slide/strategies/makeSlidesStrategy';
import type {
  AnswerType,
  ResultReturnType,
  ResultType,
} from './slide/strategies/resultStrategy';
import type { SlideInterface } from './slideInterface';
const { set: saveData } = SaveData;
type AnswerTypeIntersection = string & string[];
type ResultTypeIntersection = boolean & boolean[];
export abstract class Slide implements SlideInterface {
  txt!: AnswerType;
  ans!: AnswerType;
  res!: AnswerType;
  cont = false;
  public pageTemplate = `
    <div id="slide">
      <div id="content">
      </div>
    </div>
  `;
  isExercise = false;
  constructor(
    public readonly type: string,
    public readonly createHtml: CreateHtmlTypeIntersection,
    public readonly makeSlidesStrategy: MakeSlidesType,
    public readonly evaluateStrategy: EvaluateType,
    public readonly resultType: ResultType
  ) {}
  getSlideSet(): SlideInterface[] {
    return new Array<SlideInterface>();
  }
  public setContinue(): void {
    this.cont = true;
  }
  static getSlideSavedIndex(saves: Array<SaveData>, txt: AnswerType): number {
    return saves.findIndex((x) => isEqual(x.txt, txt));
  }
  getAnswerCount(): number {
    return 1;
  }
  abstract processJson(json: SlideInterface): void;
  abstract makeSlides(doc: Document): void;
  //necessary to load results from save file
  setResults(res: AnswerType): void {
    this.res = res;
  }
  evaluate(): Evaluation {
    const txt = this.txt as AnswerTypeIntersection;
    const res = this.res as AnswerTypeIntersection;
    const ans = this.ans as AnswerTypeIntersection;
    const result = this.result() as ResultTypeIntersection;
    return this.evaluateStrategy(txt, ans, res, result);
  }
  public saveData() {
    const txt = this.txt;
    const res = this.res;
    const cont = this.cont;
    saveData(txt, res, timestampNow(), cont);
  }
  public result(): ResultReturnType {
    return this.resultType(this.ans, this.res);
  }
  public setRes(res: AnswerType): void {
    this.res = res;
  }
  public getRes(): AnswerType {
    return this.res;
  }
  public getAns(): AnswerType {
    return this.ans;
  }
  // getSetValues() {
  //   const saveData = () => this.saveData();
  //   const result = (): ResultReturnType => this.result();
  //   const getAns = (): AnswerType => this.ans;
  //   const getRes = (): AnswerType => this.res;
  //   const setRes = (res: AnswerType): void => this.setRes(res);
  //   const setContinue = (): void => this.setContinue();
  //   const getSlide = (): SlideInterface => this;
  //   return new SetValues(
  //     saveData,
  //     result,
  //     getAns,
  //     getRes,
  //     setRes,
  //     setContinue,
  //     getSlide
  //   );
  // }
}
