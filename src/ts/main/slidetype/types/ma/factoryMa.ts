import { SlideInitializer } from '../../../slide/slideInitializer';
import type { SlideInterface } from '../../../slide/slideInterface';
import type { CreateHtmlType } from '../../strategies/createHtmlStrategy';
import { CreateHtml } from '../../strategies/createHtmlStrategy';
import { Evaluate } from '../../strategies/evaluateStrategy';
import type { MakeSlidesType } from '../../strategies/makeSlidesStrategy';
import { MakeSlidesStrategy } from '../../strategies/makeSlidesStrategy';
import { Result } from '../../strategies/resultStrategy';
import { Ma } from './slideTypeMa';

export class MaFactory extends SlideInitializer {
  constructor() {
    super('ma');
  }
  public instance(): SlideInterface {
    return new Ma(
      this.type,
      CreateHtml.MA as CreateHtmlType,
      MakeSlidesStrategy.MA as MakeSlidesType,
      Evaluate.SIMPLE,
      Result.SIMPLE
    );
  }
}
export const MA = () => new MaFactory().instance() as Ma;
