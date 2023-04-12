import { BoolFactory } from "./BoolFactory";
import { Bool, Bool } from './slideTypeBool';
import type { CreateHtmlTypeIntersection } from '../../strategies/createHtmlStrategy';
import { CreateHtml } from '../../strategies/createHtmlStrategy';
import { Evaluate } from '../../strategies/evaluateStrategy';
import { MakeSlidesStrategy } from '../../strategies/makeSlidesStrategy';
import { Result } from '../../strategies/resultStrategy';
import type { SlideInterface } from '../../../slideInterface';
import { SlideInitializer } from '../../SlideInitializer';

export class BoolFactory extends SlideInitializer {
  constructor() {
    super('bool');
  }
  public instance(): SlideInterface {
    return new Bool(
      this.type,
      CreateHtml.MC as CreateHtmlTypeIntersection,
      MakeSlidesStrategy.MC,
      Evaluate.SIMPLE,
      Result.SIMPLE
    );
  }
}
export const BOOL = () => new BoolFactory().instance() as Bool;
