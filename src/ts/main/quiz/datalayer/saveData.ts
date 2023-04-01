import { extend, isEqual } from '../../utilities';
import { explanation } from '../slide/explanation';
import type { AnswerType } from '../slide/strategies/resultStrategy';
import { SlideInterface } from '../slideInterface';
import { slideSaveFactory } from './slideSave';
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
  public static set(
    txt: string,
    res: AnswerType,
    ts: string,
    cont: boolean
  ) {
    if (txt !== '') {
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
  public static getResults(slide:SlideInterface): AnswerType {
    const saves = SaveData.get();
    const idx = SaveData.find(slide.txt,saves);
    let retval: AnswerType = '';
    if(idx >=0) retval = saves[idx].result;
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
    const slide = slideSaveFactory().getCurrentSlide();
    slide.res = SaveData.getResults(slide);
    const exp = explanation(slide);
    return (exp);
  }
}
