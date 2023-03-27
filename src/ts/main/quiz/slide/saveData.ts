import { extend, isEqual } from '../../utilities';
import type { AnswerType } from './strategies/resultStrategy';
import {Json} from '../../globals';
import { explanation } from './explanation';
const KEY = 'savedata';
export class SaveData {
  constructor(
    public readonly txt: AnswerType,
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
    txt: AnswerType,
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
  public static getCurrentSlide() {
    const slide = Json.getCurrentSlide();
    const saves = SaveData.get();
    const idx = saves.findIndex((x) => isEqual(x.txt, slide.txt as string));
    if(idx >= 0) {
      const save = saves[idx];
      slide.res = save.result;
    }
    const exp = explanation(slide);
    return (exp);
  }

}
