import { AnswerType } from './strategies/result';
import { extend } from '../../../main/utilities';
export class SaveData {
  constructor(
    public readonly txt: AnswerType,
    public readonly result: AnswerType
  ) {}
  public static getSavedDataArray(): Array<SaveData> {
    const data = localStorage.getItem('savedata') as string;
    const data1 = JSON.parse(data);
    const arr: Array<SaveData> = extend<Array<SaveData>>(
      new Array<SaveData>(),
      data1
    );
    return arr;
  }
  public static saveData(txt: AnswerType, res: AnswerType) {
    if (txt !== '') {
      const save = new SaveData(txt, res);
      const arr = SaveData.getSavedDataArray();
      arr.push(save);
      localStorage.setItem('savedata', JSON.stringify(arr));
    }
  }
}
