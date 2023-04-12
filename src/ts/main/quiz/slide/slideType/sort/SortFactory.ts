import { Sort } from './slideTypeSort';
import type { CreateHtmlTypeIntersection } from '../../strategies/createHtmlStrategy';
import { CreateHtml } from '../../strategies/createHtmlStrategy';
import { Evaluate } from '../../strategies/evaluateStrategy';
import { MakeSlidesStrategy } from '../../strategies/makeSlidesStrategy';
import { Result } from '../../strategies/resultStrategy';
import type { SlideInterface } from '../../../slideInterface';
import { SlideInitializer } from '../../SlideInitializer';

export class SortFactory extends SlideInitializer {
  constructor() {
    super('sort');
  }
  public instance(): SlideInterface {
    return new Sort(
      this.type,
      CreateHtml.SORT as CreateHtmlTypeIntersection,
      MakeSlidesStrategy.SORT,
      Evaluate.SIMPLE,
      Result.SIMPLE
    );
  }
}
