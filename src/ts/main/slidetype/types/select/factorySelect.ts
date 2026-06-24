import type { SlideInterface } from '../../../slide/index';
import { SlideInitializer } from '../../misc/slideInitializer';
import { Evaluate } from '../../strategies/evaluateStrategy';
import { Result } from '../../strategies/resultStrategy';
import { Select } from './slideTypeSelect';

export class SelectFactory extends SlideInitializer {
  constructor() {
    super('select');
  }
  public instance(): SlideInterface {
    return new Select(this.type, Evaluate.SELECT, Result.SIMPLE);
  }
}
export const SELECT = () => new SelectFactory().instance() as Select;
