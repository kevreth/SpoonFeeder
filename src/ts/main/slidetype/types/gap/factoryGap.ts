import type { SlideInterface } from '../../../slide/index';
import { SlideInitializer } from '../../misc/slideInitializer';
import { Evaluate } from '../../strategies/evaluateStrategy';
import { Result } from '../../strategies/resultStrategy';
import { Gap } from './slideTypeGap';

export class GapFactory extends SlideInitializer {
  constructor() {
    super('gap');
  }
  public instance(): SlideInterface {
    return new Gap(this.type, Evaluate.GAP, Result.CORRELATED);
  }
}
export const GAP = () => new GapFactory().instance() as Gap;
