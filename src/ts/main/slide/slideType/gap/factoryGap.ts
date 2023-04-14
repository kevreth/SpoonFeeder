import { SlideInitializer } from '../../slideInitializer';
import type { SlideInterface } from '../../slideInterface';
import { CreateHtml } from '../../strategies/createHtmlStrategy';
import { Evaluate } from '../../strategies/evaluateStrategy';
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
      CreateHtml.GAP,
      MakeSlidesStrategy.GAP,
      Evaluate.GAP,
      Result.CORRELATED
    );
  }
}
export const GAP = () => new GapFactory().instance() as Gap;
