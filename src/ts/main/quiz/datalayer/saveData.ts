import { extend, isEqual, last } from '../../utilities';
import { explanation } from '../slide/explanation';
import type { AnswerType } from '../slide/strategies/resultStrategy';
import { fillMatchingSlide } from '../slideDispatcher';
import { SlideInterface } from '../slideInterface';
import { StateActions, dispatch2 } from '../stateActionDispatcher';
import { Json } from './globals';
const KEY = 'savedata';
export class SaveData {
  constructor(
    public readonly txt: string,
    public readonly result: AnswerType,
    public readonly ts: string,
    public readonly cont: boolean
  ) {}
  public static get(): Array<SaveData> {
    const data = localStorage.getItem(KEY) as string;
    const data1 = JSON.parse(data);
    const arr1 = new Array<SaveData>();
    const arr: Array<SaveData> = extend<Array<SaveData>>(arr1, data1);
    return arr;
  }
  public static set(txt: string, res: AnswerType, ts: string, cont: boolean) {
    if (txt !== '' && SaveData.exists(txt) === false) {
      const save = new SaveData(txt, res, ts, cont);
      const arr = SaveData.get();
      arr.push(save);
      const json = JSON.stringify(arr);
      localStorage.setItem(KEY, json);
    }
  }
  public static find(txt: string, saves: Array<SaveData>): number {
    return saves.findIndex((saved) => isEqual(saved.txt, txt));
  }
  public static doesExist(txt: string, saves: Array<SaveData>): boolean {
    return SaveData.find(txt, saves) > -1 ? true : false;
  }
  public static exists(txt: string): boolean {
    return SaveData.doesExist(txt, SaveData.get());
  }
  public static getResults(slide: SlideInterface): AnswerType {
    const saves = SaveData.get();
    const idx = SaveData.find(slide.txt, saves);
    let retval: AnswerType = '';
    if (idx >= 0) retval = saves[idx].result;
    return retval;
  }
  public static replace(save: SaveData, idx: number, saves: SaveData[]) {
    if (save == null || idx == null || saves == null) return;
    saves[idx] = save;
    const json = JSON.stringify(saves);
    localStorage.setItem(KEY, json);
  }
  public static setContinueTrue(txt: string) {
    const saves = SaveData.get();
    const idx = SaveData.find(txt, saves);
    const record0 = saves[idx];
    const record1 = new SaveData(record0.txt, record0.result, record0.ts, true);
    SaveData.replace(record1, idx, saves);
  }
  // Used only in Vue.
  public static getCurrentSlide() {
    const slide = getCurrentSlide();
    slide.res = SaveData.getResults(slide);
    const exp = explanation(slide);
    return exp;
  }
}
function getCurrentSlide(): SlideInterface {
  const ss = new SlideDispatcher2(Json.get(), SaveData.get());
  return dispatch2(ss, false);
}
export class SlideDispatcher2 implements StateActions<SlideInterface> {
  constructor(public slides: SlideInterface[], public saves: SaveData[]) {}
  //DUPLICATE CODE: slideDispatche.getSlide()
  private getSlide(increment: number) {
    const save = last(this.saves) as SaveData;
    const idx = Json.findMatchingSlide(this.slides, save.txt);
    const slide = Json.getMatchingSlide(this.slides, idx + increment);
    fillMatchingSlide(slide, save);
    return slide;
  }
  begin(): SlideInterface {
    return this.slides[0];
  }
  current(): SlideInterface {
    return this.getSlide(0);
  }
  decorate(): SlideInterface {
    return this.getSlide(0);
  }
  next(): SlideInterface {
    throw new Error('Method not implemented.');
  }
  end(): SlideInterface {
    throw new Error('Method not implemented.');
  }
}
