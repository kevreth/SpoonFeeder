import { SlideInitializer } from '../../slideInitializer'
import type { SlideInterface } from '../../slideInterface'
import { CreateHtml, CreateHtmlType } from '../../strategies/createHtmlStrategy'
import { Evaluate } from '../../strategies/evaluateStrategy'
import { MakeSlidesStrategy, MakeSlidesType } from '../../strategies/makeSlidesStrategy'
import { Result } from '../../strategies/resultStrategy'
import { Info } from './slideTypeInfo'

export class InfoFactory extends SlideInitializer {
  constructor() {
    super('info');
  }
  public instance(): SlideInterface {
    return new Info(
      this.type,
      CreateHtml.INFO as CreateHtmlType,
      MakeSlidesStrategy.INFO as MakeSlidesType,
      Evaluate.DEFAULT,
      Result.UNSUPPORTED
    );
  }
}
export const INFO = () => new InfoFactory().instance() as Info;
