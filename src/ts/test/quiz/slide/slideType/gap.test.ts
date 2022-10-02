import { beforeEach, it } from 'vitest';
import { Slide } from '../../../../main/quiz/slide';
import { Gap } from '../../../../main/quiz/slide/slideType/gap';
import {
  CreateHtml,
  CreateHtmlTypeIntersection,
} from '../../../../main/quiz/slide/strategies/createHtml';
import { Evaluate } from '../../../../main/quiz/slide/strategies/evaluate';
import { MakeSlides } from '../../../../main/quiz/slide/strategies/makeSlides';
import { Result } from '../../../../main/quiz/slide/strategies/result';
import { SlideTest } from '../../slide.test';
export class GapTest extends SlideTest<Array<string>> {
  protected factory(): Slide<Array<string>> {
    return new Gap(
      'gap',
      CreateHtml.GAP as CreateHtmlTypeIntersection,
      MakeSlides.GAP,
      Evaluate.GAP,
      Result.CORRELATED
    );
  }
}
const test = new GapTest();
beforeEach(() => {
  test.setUp();
});
it('getSetValues', () => {
  test.getSetValues();
});
