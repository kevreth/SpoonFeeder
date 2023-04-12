import { Select } from './slideTypeSelect';
import type { CreateHtmlTypeIntersection } from '../../strategies/createHtmlStrategy';
import { CreateHtml } from '../../strategies/createHtmlStrategy';
import { Evaluate } from '../../strategies/evaluateStrategy';
import { MakeSlidesStrategy } from '../../strategies/makeSlidesStrategy';
import { Result } from '../../strategies/resultStrategy';
import type { SlideInterface } from '../../../slideInterface';
import { SlideInitializer } from '../../SlideInitializer';

export class SelectFactory extends SlideInitializer {
  constructor() {
    super('select');
  }
  public instance(): SlideInterface {
    return new Select(
      this.type,
      CreateHtml.SELECT as CreateHtmlTypeIntersection,
      MakeSlidesStrategy.SELECT,
      Evaluate.SIMPLE,
      Result.SIMPLE
    );
  }
}
