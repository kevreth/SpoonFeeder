import { expect, it } from 'vitest';
import { Slide } from '../../main/quiz/slide';
import { AnswerType } from '../../main/quiz/slide/strategies/result';
import { AbstractTest } from '../abstractTest';
export abstract class SlideTest<T extends AnswerType> extends AbstractTest<
  Slide<T>
> {
  public getSetValues() {
    const sv = this.testable.getSetValues();
    expect(sv.result).not.toBeNull();
    expect(sv.result).not.toBeNull();
    expect(sv.result).not.toBeNull();
  }
  public abstract processJson(): void;
  public abstract makeSlides(): void;
}
it('shutup', () => {
  expect(0).toEqual(0);
});
