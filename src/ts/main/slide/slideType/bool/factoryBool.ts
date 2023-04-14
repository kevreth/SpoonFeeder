import { Bool } from './slideTypeBool';
import { CreateHtml } from '../../strategies/createHtmlStrategy';
import { Evaluate } from '../../strategies/evaluateStrategy';
import { MakeSlidesStrategy } from '../../strategies/makeSlidesStrategy';
import { Result } from '../../strategies/resultStrategy';
import type { SlideInterface } from '../../slideInterface';
import { SlideInitializer } from '../../slideInitializer';

export class BoolFactory extends SlideInitializer {
  constructor() {
    super('bool');
  }
  public instance(): SlideInterface {
    return new Bool(
      this.type,
      CreateHtml.MC,
      MakeSlidesStrategy.MC,
      Evaluate.SIMPLE,
      Result.SIMPLE
    );
  }
}
export const BOOL = () => new BoolFactory().instance() as Bool;
