import { Ma } from './slideTypeMa';
import type { CreateHtmlTypeIntersection } from '../../strategies/createHtmlStrategy';
import { CreateHtml } from '../../strategies/createHtmlStrategy';
import { Evaluate } from '../../strategies/evaluateStrategy';
import { MakeSlidesStrategy } from '../../strategies/makeSlidesStrategy';
import { Result } from '../../strategies/resultStrategy';
import type { SlideInterface } from '../../../slideInterface';
import { SlideInitializer } from '../../slideInitializer';

export class MaFactory extends SlideInitializer {
  constructor() {
    super('ma');
  }
  public instance(): SlideInterface {
    return new Ma(
      this.type,
      CreateHtml.MA as CreateHtmlTypeIntersection,
      MakeSlidesStrategy.MA,
      Evaluate.SIMPLE,
      Result.SIMPLE
    );
  }
}
export const MA = () => new MaFactory().instance() as Ma;
