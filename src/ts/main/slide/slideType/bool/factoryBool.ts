import { SlideInitializer } from '../../slideInitializer';
import type { SlideInterface } from '../../slideInterface';
import {
  CreateHtml,
  CreateHtmlType,
} from '../../strategies/createHtmlStrategy';
import { Evaluate } from '../../strategies/evaluateStrategy';
import {
  MakeSlidesStrategy,
  MakeSlidesType,
} from '../../strategies/makeSlidesStrategy';
import { Result } from '../../strategies/resultStrategy';
import { Bool } from './slideTypeBool';

export class BoolFactory extends SlideInitializer {
  constructor() {
    super('bool');
  }
  public instance(): SlideInterface {
    return new Bool(
      this.type,
      CreateHtml.MC as CreateHtmlType,
      MakeSlidesStrategy.MC as MakeSlidesType,
      Evaluate.SIMPLE,
      Result.SIMPLE
    );
  }
}
export const BOOL = () => new BoolFactory().instance() as Bool;
