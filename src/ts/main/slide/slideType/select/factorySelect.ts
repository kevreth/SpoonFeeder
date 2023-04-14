import { Select } from './slideTypeSelect';
import { CreateHtml } from '../../strategies/createHtmlStrategy';
import { Evaluate } from '../../strategies/evaluateStrategy';
import { MakeSlidesStrategy } from '../../strategies/makeSlidesStrategy';
import { Result } from '../../strategies/resultStrategy';
import type { SlideInterface } from '../../slideInterface';
import { SlideInitializer } from '../../slideInitializer';

export class SelectFactory extends SlideInitializer {
  constructor() {
    super('select');
  }
  public instance(): SlideInterface {
    return new Select(
      this.type,
      CreateHtml.SELECT,
      MakeSlidesStrategy.SELECT,
      Evaluate.SIMPLE,
      Result.SIMPLE
    );
  }
}
export const SELECT = () => new SelectFactory().instance() as Select;
