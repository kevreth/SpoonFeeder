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
import { Select } from './slideTypeSelect';

export class SelectFactory extends SlideInitializer {
  constructor() {
    super('select');
  }
  public instance(): SlideInterface {
    return new Select(
      this.type,
      CreateHtml.SELECT as CreateHtmlType,
      MakeSlidesStrategy.SELECT as MakeSlidesType,
      Evaluate.SIMPLE,
      Result.SIMPLE
    );
  }
}
export const SELECT = () => new SelectFactory().instance() as Select;
