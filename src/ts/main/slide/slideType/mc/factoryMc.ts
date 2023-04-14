import { Mc } from './slideTypeMc';
import { CreateHtml } from '../../strategies/createHtmlStrategy';
import { Evaluate } from '../../strategies/evaluateStrategy';
import { MakeSlidesStrategy } from '../../strategies/makeSlidesStrategy';
import { Result } from '../../strategies/resultStrategy';
import type { SlideInterface } from '../../slideInterface';
import { SlideInitializer } from '../../slideInitializer';

export class McFactory extends SlideInitializer {
  constructor() {
    super('mc');
  }
  public instance(): SlideInterface {
    return new Mc(
      this.type,
      CreateHtml.MC,
      MakeSlidesStrategy.MC,
      Evaluate.SIMPLE,
      Result.SIMPLE
    );
  }
}
export const MC = () => new McFactory().instance() as Mc;
