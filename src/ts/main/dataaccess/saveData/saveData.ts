import { isEqual, last } from 'lodash';
import type { AnswerType, SlideInterface } from '../../slide/slideInterface';
import { COURSE_NAME } from '../webstorage/webStorage';
import { localAsync, localSync, appRegistry, appClock } from '../../infrastructure/storage/storageInit';
import { registerCourseSchema } from '../../infrastructure/storage/schemas/spoonfeederSchemas';
import { extend } from '../../index';
import { timestampNow } from './date';

function ensureCourseRegistered(courseName: string): void {
  if (appRegistry.getSchema(courseName) === undefined) {
    registerCourseSchema(appRegistry, courseName);
  }
}

export class SaveData {
  constructor(
    public readonly txt: string,
    public readonly result: AnswerType,
    public readonly ts: string,
    public readonly cont: boolean
  ) {}

  public static async get(): Promise<Array<SaveData>> {
    const courseName = COURSE_NAME.get();
    if (!courseName) return [];
    ensureCourseRegistered(courseName);
    const raw = await localAsync.get<unknown[]>(courseName);
    if (!raw) return [];
    const arr1 = new Array<SaveData>();
    return extend<Array<SaveData>>(arr1, raw);
  }

  public static async set(txt: string, res: AnswerType, cont: boolean): Promise<void> {
    if (txt === '') return;
    const saves = await SaveData.get();
    if (SaveData.doesExist(txt, saves)) return;
    const save = new SaveData(txt, res, timestampNow(appClock), cont);
    saves.push(save);
    const courseName = COURSE_NAME.get() as string;
    ensureCourseRegistered(courseName);
    await localAsync.set(courseName, saves);
  }

  public static async lastSavedItem(): Promise<SaveData> {
    return last(await SaveData.get()) as SaveData;
  }

  public static find(txt: string, saves: Array<SaveData>): number {
    return saves.findIndex((saved) => isEqual(saved.txt, txt));
  }

  public static doesExist(txt: string, saves: Array<SaveData>): boolean {
    return SaveData.find(txt, saves) > -1;
  }

  public static async exists(txt: string): Promise<boolean> {
    return SaveData.doesExist(txt, await SaveData.get());
  }

  /**
   * Sync read for use in score/summary calculation (scoreProcessor, evaluate).
   * Reads from localStorage synchronously; safe because localStorage IS synchronous.
   */
  public static getResults(slide: SlideInterface): AnswerType {
    const courseName = COURSE_NAME.get();
    if (!courseName) return '' as AnswerType;
    ensureCourseRegistered(courseName);
    const raw = localSync.get<unknown[]>(courseName);
    if (!raw) return '' as AnswerType;
    const arr1 = new Array<SaveData>();
    const saves = extend<Array<SaveData>>(arr1, raw);
    return SaveData.getResultsFromSaves(slide, saves);
  }

  /** Pure helper — no IO. Use when saves are already loaded. */
  public static getResultsFromSaves(slide: SlideInterface, saves: Array<SaveData>): AnswerType {
    const idx = SaveData.find(slide.txt, saves);
    return idx >= 0 ? saves[idx].result : ('' as AnswerType);
  }

  public static async replace(save: SaveData, idx: number, saves: SaveData[]): Promise<void> {
    if (save == null || idx == null || saves == null) return;
    saves[idx] = save;
    const courseName = COURSE_NAME.get() as string;
    ensureCourseRegistered(courseName);
    await localAsync.set(courseName, saves);
  }

  public static async setContinueTrue(txt: string): Promise<void> {
    const saves = await SaveData.get();
    const idx = SaveData.find(txt, saves);
    if (idx < 0) return;
    const record0 = saves[idx];
    const record1 = new SaveData(record0.txt, record0.result, record0.ts, true);
    await SaveData.replace(record1, idx, saves);
  }
}
