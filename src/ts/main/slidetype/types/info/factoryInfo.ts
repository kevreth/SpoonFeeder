import type { SlideInterface } from '../../../slide/mediator';
import { SlideInitializer } from '../../misc/slideInitializer';
import type { CreateHtmlType } from '../../strategies/createHtmlStrategy';
import { CreateHtml } from '../../strategies/createHtmlStrategy';
import { Evaluate } from '../../strategies/evaluateStrategy';
import type { MakeSlidesType } from '../../strategies/makeSlidesStrategy';
import { MakeSlidesStrategy } from '../../strategies/makeSlidesStrategy';
import { Result } from '../../strategies/resultStrategy';
import { Info } from './slideTypeInfo';

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
