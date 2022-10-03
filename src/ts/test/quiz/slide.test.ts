import { JSDOM } from 'jsdom';
import { expect, it, vi } from 'vitest';
import { Slide } from '../../main/quiz/slide';
import { AnswerType } from '../../main/quiz/slide/strategies/result';
import { AbstractTest } from '../abstractTest';
export abstract class SlideTest<T extends AnswerType> extends AbstractTest<
  Slide<T>
> {
  public abstract processJson(): void;
  public type!: string;
  public getSetValues() {
    const sv = this.getTestable().getSetValues();
    expect(sv.result).not.toBeNull();
    expect(sv.result).not.toBeNull();
    expect(sv.result).not.toBeNull();
  }
  public makeSlides(): void {
    const testable = this.getTestable();
    const spy = vi.spyOn(testable, 'makeSlidesStrategy');
    const dom = new JSDOM();
    testable.makeSlides(dom.window.document);
    expect(spy).toHaveBeenCalled();
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
