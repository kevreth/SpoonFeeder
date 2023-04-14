import { SlideInitializer } from '../../slideInitializer';
import type { SlideInterface } from '../../slideInterface';
import type { CreateHtmlType } from '../../strategies/createHtmlStrategy';
import { CreateHtml } from '../../strategies/createHtmlStrategy';
import { Evaluate } from '../../strategies/evaluateStrategy';
import type { MakeSlidesType } from '../../strategies/makeSlidesStrategy';
import { MakeSlidesStrategy } from '../../strategies/makeSlidesStrategy';
import { Result } from '../../strategies/resultStrategy';
import { Sort } from './slideTypeSort';

export class SortFactory extends SlideInitializer {
  constructor() {
    super('sort');
  }
  public instance(): SlideInterface {
    return new Sort(
      this.type,
      CreateHtml.SORT as CreateHtmlType,
      MakeSlidesStrategy.SORT as MakeSlidesType,
      Evaluate.SIMPLE,
      Result.SIMPLE
    );
  }
}
export const SORT = () => new SortFactory().instance() as Sort;
