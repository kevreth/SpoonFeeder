import type { SlideInterface } from '../../../slide/index';
import { SlideInitializer } from '../../misc/slideInitializer';
import { Evaluate } from '../../strategies/evaluateStrategy';
import { Result } from '../../strategies/resultStrategy';
import { Ema } from './slideTypeEma';

export class EmaFactory extends SlideInitializer {
  constructor() {
    super('ema');
  }
  public instance(): SlideInterface {
    return new Ema(this.type, Evaluate.PARTIAL, Result.PARTIAL);
  }
}
export const EMA = () => new EmaFactory().instance() as Ema;
