import { SlideInitializer } from '../../../slide/slideInitializer';
import type { SlideInterface } from '../../../slide/slideInterface';
import type { CreateHtmlType } from '../../strategies/createHtmlStrategy';
import { CreateHtml } from '../../strategies/createHtmlStrategy';
import { Evaluate } from '../../strategies/evaluateStrategy';
import type { MakeSlidesType } from '../../strategies/makeSlidesStrategy';
import { MakeSlidesStrategy } from '../../strategies/makeSlidesStrategy';
import { Result } from '../../strategies/resultStrategy';
import { Gap } from './slideTypeGap';

export class GapFactory extends SlideInitializer {
  constructor() {
    super('gap');
  }
  public instance(): SlideInterface {
    return new Gap(
      this.type,
      CreateHtml.GAP as CreateHtmlType,
      MakeSlidesStrategy.GAP as MakeSlidesType,
      Evaluate.GAP,
      Result.CORRELATED
    );
  }
}
export const GAP = () => new GapFactory().instance() as Gap;
