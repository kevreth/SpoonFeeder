import type { SlideInterface } from '../../../slide/index';
import { SlideInitializer } from '../../misc/slideInitializer';
import { Evaluate } from '../../strategies/evaluateStrategy';
import { Result } from '../../strategies/resultStrategy';
import { Info } from './slideTypeInfo';

export class InfoFactory extends SlideInitializer {
  constructor() {
    super('info');
  }
  public instance(): SlideInterface {
    return new Info(this.type, Evaluate.DEFAULT, Result.UNSUPPORTED);
  }
}
export const INFO = () => new InfoFactory().instance() as Info;
