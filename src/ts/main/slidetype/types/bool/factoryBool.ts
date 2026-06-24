import type { SlideInterface } from '../../../slide/slideInterface';
import { SlideInitializer } from '../../misc/slideInitializer';
import { Evaluate } from '../../strategies/evaluateStrategy';
import { Result } from '../../strategies/resultStrategy';
import { Bool } from './slideTypeBool';

export class BoolFactory extends SlideInitializer {
  constructor() {
    super('bool');
  }
  public instance(): SlideInterface {
    return new Bool(this.type, Evaluate.SIMPLE, Result.SIMPLE);
  }
}
export const BOOL = () => new BoolFactory().instance() as Bool;
