import type { SlideInterface } from '../../../slide/index';
import { SlideInitializer } from '../../misc/slideInitializer';
import { Evaluate } from '../../strategies/evaluateStrategy';
import { Result } from '../../strategies/resultStrategy';
import { Sort } from './slideTypeSort';

export class SortFactory extends SlideInitializer {
  constructor() {
    super('sort');
  }
  public instance(): SlideInterface {
    return new Sort(this.type, Evaluate.SIMPLE, Result.SIMPLE);
  }
}
export const SORT = () => new SortFactory().instance() as Sort;
