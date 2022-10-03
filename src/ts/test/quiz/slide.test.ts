import { expect, it } from 'vitest';
import { Slide } from '../../main/quiz/slide';
import { AnswerType } from '../../main/quiz/slide/strategies/result';
import { AbstractTest } from '../abstractTest';
export abstract class SlideTest<T extends AnswerType> extends AbstractTest<
  Slide<T>
> {
  public abstract processJson(): void;
  public abstract makeSlides(): void;
  public type!: string;
  public getSetValues() {
    const sv = this.getTestable().getSetValues();
    expect(sv.result).not.toBeNull();
    expect(sv.result).not.toBeNull();
    expect(sv.result).not.toBeNull();
  }
  // public factory(): Slide<T> {
  //   const createHtml = vi.fn();
  //   const makeSlides = vi.fn();
  //   const evaluate = vi.fn();
  //   const result = vi.fn();
  //   return this.getInstance(
  //     this.type,
  //     createHtml,
  //     makeSlides,
  //     evaluate,
  //     result
  //   );
  // }
  // public getInstance(type: any, ...args: any[]) {
  //   type = type.charAt(0).toUpperCase() + type.slice(1);
  //   console.log(type);
  //   const newInstance = new (<any>window)[type]();
  //   newInstance.constructor(newInstance, ...args);
  //   return newInstance;
  // }
}
it('shutup', () => {
  expect(0).toEqual(0);
});
