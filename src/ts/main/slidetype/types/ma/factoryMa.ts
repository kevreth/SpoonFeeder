import type { SlideInterface } from '../../../slide/index';
import { SlideInitializer } from '../../misc/slideInitializer';
import { Evaluate } from '../../strategies/evaluateStrategy';
import { Result } from '../../strategies/resultStrategy';
import { Ma } from './slideTypeMa';

export class MaFactory extends SlideInitializer {
  constructor() {
    super('ma');
  }
  public instance(): SlideInterface {
    return new Ma(this.type, Evaluate.SIMPLE, Result.SIMPLE);
  }
}
export const MA = () => new MaFactory().instance() as Ma;
