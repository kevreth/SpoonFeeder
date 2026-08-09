import type { SlideInterface } from '../../../slide/index';
import { SlideInitializer } from '../../misc/slideInitializer';
import { Evaluate } from '../../strategies/evaluateStrategy';
import { Result } from '../../strategies/resultStrategy';
import { Bins } from './slideTypeBins';

export class BinsFactory extends SlideInitializer {
  constructor() {
    super('bins');
  }
  public instance(): SlideInterface {
    return new Bins(this.type, Evaluate.GAP, Result.CORRELATED);
  }
}
export const BINS = () => new BinsFactory().instance() as Bins;
