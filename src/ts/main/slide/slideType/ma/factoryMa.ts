import { SlideInitializer } from '../../slideInitializer';
import type { SlideInterface } from '../../slideInterface';
import { CreateHtml } from '../../strategies/createHtmlStrategy';
import { Evaluate } from '../../strategies/evaluateStrategy';
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
      CreateHtml.MA,
      MakeSlidesStrategy.MA,
      Evaluate.SIMPLE,
      Result.SIMPLE
    );
  }
}
export const MA = () => new MaFactory().instance() as Ma;
