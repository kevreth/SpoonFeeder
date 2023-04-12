import { Gap } from './slideTypeGap';
import type { CreateHtmlTypeIntersection } from '../../strategies/createHtmlStrategy';
import { CreateHtml } from '../../strategies/createHtmlStrategy';
import { Evaluate } from '../../strategies/evaluateStrategy';
import { MakeSlidesStrategy } from '../../strategies/makeSlidesStrategy';
import { Result } from '../../strategies/resultStrategy';
import type { SlideInterface } from '../../../slideInterface';
import { SlideInitializer } from '../../SlideInitializer';

export class GapFactory extends SlideInitializer {
  constructor() {
    super('gap');
  }
  public instance(): SlideInterface {
    return new Gap(
      this.type,
      CreateHtml.GAP as CreateHtmlTypeIntersection,
      MakeSlidesStrategy.GAP,
      Evaluate.GAP,
      Result.CORRELATED
    );
  }
}
