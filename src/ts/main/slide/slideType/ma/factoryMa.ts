import { SlideInitializer } from '../../slideInitializer'
import type { SlideInterface } from '../../slideInterface'
import { CreateHtml, CreateHtmlType } from '../../strategies/createHtmlStrategy'
import { Evaluate } from '../../strategies/evaluateStrategy'
import { MakeSlidesStrategy, MakeSlidesType } from '../../strategies/makeSlidesStrategy'
import { Result } from '../../strategies/resultStrategy'
import { Ma } from './slideTypeMa'

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
