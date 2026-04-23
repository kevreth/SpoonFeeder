import { isEqual, last } from 'lodash';
import type { AnswerType, SlideInterface } from '../../slide/slideInterface';
import { COURSE_NAME, getSaveData, setSaveData } from '../webstorage/webStorage';
import { extend } from '../../index';
import { timestampNow } from './date';
export class SaveData {
  constructor(
    public readonly txt: string,
    public readonly result: AnswerType,
    public readonly ts: string,
    public readonly cont: boolean,
    public readonly idx?: number
  ) {}
  public static get(): Array<SaveData> {
    const data = getSaveData(COURSE_NAME.get() as string) as string;
    const data1 = JSON.parse(data);
    const arr1 = new Array<SaveData>();
    const arr: Array<SaveData> = extend<Array<SaveData>>(arr1, data1);
    return arr;
  }
  public static set(txt: string, res: AnswerType, cont: boolean, idx?: number) {
    if (txt !== '' && !SaveData.exists(txt, idx)) {
      const save = new SaveData(txt, res, timestampNow(), cont, idx);
      const arr = SaveData.get();
      arr.push(save);
      const json = JSON.stringify(arr);
      setSaveData(COURSE_NAME.get() as string, json);
    }
  }
  public static lastSavedItem() {
    return last(SaveData.get()) as SaveData;
  }
  public static find(
    txt: string,
    saves: Array<SaveData>,
    idx?: number
  ): number {
    return saves.findIndex((saved) => {
      const textMatches = isEqual(saved.txt, txt);
      if (idx !== undefined && saved.idx !== undefined) {
        return textMatches && saved.idx === idx;
      }
      return textMatches;
    });
  }
  public static doesExist(
    txt: string,
    saves: Array<SaveData>,
    idx?: number
  ): boolean {
    return SaveData.find(txt, saves, idx) > -1 ? true : false;
  }
  public static exists(txt: string, idx?: number): boolean {
    return SaveData.doesExist(txt, SaveData.get(), idx);
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
    setSaveData(COURSE_NAME.get() as string, json);
  }
  public static setContinueTrue(txt: string, slideIdx?: number) {
    const saves = SaveData.get();
    const idx = SaveData.find(txt, saves, slideIdx);
    const record0 = saves[idx];
    const record1 = new SaveData(
      record0.txt,
      record0.result,
      record0.ts,
      true,
      record0.idx
    );
    SaveData.replace(record1, idx, saves);
  }
}

