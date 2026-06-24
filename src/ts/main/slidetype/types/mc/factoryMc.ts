import type { SlideInterface } from '../../../slide/index';
import { SlideInitializer } from '../../misc/slideInitializer';
import { Evaluate } from '../../strategies/evaluateStrategy';
import { Result } from '../../strategies/resultStrategy';
import { Mc } from './slideTypeMc';

export class McFactory extends SlideInitializer {
  constructor() {
    super('mc');
  }
  public instance(): SlideInterface {
    return new Mc(this.type, Evaluate.SIMPLE, Result.SIMPLE);
  }
}
export const MC = () => new McFactory().instance() as Mc;
