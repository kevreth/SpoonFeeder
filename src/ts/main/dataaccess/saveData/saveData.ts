import type { AnswerType, SlideInterface } from '../../quiz/mediator';
import {
  dispatch2,
  explanation,
  extend,
  isEqual,
  last,
} from '../../quiz/mediator';
import {
  getLocalStorage,
  setLocalStorage,
} from '../persistence/webPersistence';
import { getCourseName } from '../webstorage/webStorage';
import { timestampNow } from './date';
import { Json } from './saveFile';
import { SaveDataDispatcher } from './slideDispatcher2';

export class SaveData {
  constructor(
    public readonly txt: string,
    public readonly result: AnswerType,
    public readonly ts: string,
    public readonly cont: boolean
  ) {}
  public static get(): Array<SaveData> {
    const data = getLocalStorage(getCourseName()) as string;
    const data1 = JSON.parse(data);
    const arr1 = new Array<SaveData>();
    const arr: Array<SaveData> = extend<Array<SaveData>>(arr1, data1);
    return arr;
  }
  public static set(txt: string, res: AnswerType, cont: boolean) {
    if (txt !== '' && !SaveData.exists(txt)) {
      const save = new SaveData(txt, res, timestampNow(), cont);
      const arr = SaveData.get();
      arr.push(save);
      const json = JSON.stringify(arr);
      setLocalStorage(getCourseName(), json);
    }
  }
  public static lastSavedItem() {
    return last(SaveData.get()) as SaveData;
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
    let retval = '' as AnswerType;
    if (idx >= 0) retval = saves[idx].result;
    return retval;
  }
  public static replace(save: SaveData, idx: number, saves: SaveData[]) {
    if (save == null || idx == null || saves == null) return;
    saves[idx] = save;
    const json = JSON.stringify(saves);
    setLocalStorage(getCourseName(), json);
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
  const ss = new SaveDataDispatcher(Json.get(), SaveData.get());
  return dispatch2(ss, false);
}
