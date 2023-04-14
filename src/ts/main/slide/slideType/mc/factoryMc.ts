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
import { Mc } from './slideTypeMc';

export class McFactory extends SlideInitializer {
  constructor() {
    super('mc');
  }
  public instance(): SlideInterface {
    return new Mc(
      this.type,
      CreateHtml.MC as CreateHtmlType,
      MakeSlidesStrategy.MC as MakeSlidesType,
      Evaluate.SIMPLE,
      Result.SIMPLE
    );
  }
}
export const MC = () => new McFactory().instance() as Mc;
