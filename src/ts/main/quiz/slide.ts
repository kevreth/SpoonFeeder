import { isEqual, timestampNow } from '../utilities';
import type { Evaluation } from './evaluate';
import { exerciseGroupSlideIndex } from './exerciseGroup';
import { SaveData } from './slide/saveData';
import { SetValues } from './slide/setValues';
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
  setContinue(): void {
    this.cont = true;
  }
  static getSlideSavedIndex(saves: Array<SaveData>, txt: AnswerType): number {
    //TODO: factor out code in common with MakeSlides.showSlides() and Score.exercise()
    let retval = -1;
    const isArray = Array.isArray(txt);
    if (isArray) {
      retval = exerciseGroupSlideIndex(
        saves,
        txt as string[] & number[],
        retval
      );
    } else {
      retval = saves.findIndex((x) => isEqual(x.txt, txt));
    }
    return retval;
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
  saveData() {
    const txt = this.txt;
    const res = this.res;
    const cont = this.cont;
    saveData(txt, res, timestampNow(), cont);
  }
  result(): ResultReturnType {
    return this.resultType(this.ans, this.res);
  }
  setRes(res: AnswerType): void {
    this.res = res;
  }
  getSetValues() {
    const saveData = () => this.saveData();
    const result = (): ResultReturnType => this.result();
    const setRes = (res: AnswerType): void => this.setRes(res);
    const setContinue = (): void => this.setContinue();
    return new SetValues(saveData, result, setRes, setContinue);
  }
}
