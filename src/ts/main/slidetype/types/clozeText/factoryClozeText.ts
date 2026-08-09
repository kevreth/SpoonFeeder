import type { SlideInterface } from '../../../slide/index';
import { SlideInitializer } from '../../misc/slideInitializer';
import { Evaluate } from '../../strategies/evaluateStrategy';
import { Result } from '../../strategies/resultStrategy';
import { ClozeText } from './slideTypeClozeText';

export class ClozeTextFactory extends SlideInitializer {
  constructor() {
    super('cloze-text');
  }
  public instance(): SlideInterface {
    return new ClozeText(this.type, Evaluate.GAP, Result.CORRELATED);
  }
}
export const CLOZE_TEXT = () => new ClozeTextFactory().instance() as ClozeText;
