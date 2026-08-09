import type { SlideInterface } from '../../../slide/index';
import { SlideInitializer } from '../../misc/slideInitializer';
import { Evaluate } from '../../strategies/evaluateStrategy';
import { Result } from '../../strategies/resultStrategy';
import { ClozeTable } from './slideTypeClozeTable';

export class ClozeTableFactory extends SlideInitializer {
  constructor() {
    super('cloze-table');
  }
  public instance(): SlideInterface {
    return new ClozeTable(this.type, Evaluate.GAP, Result.CORRELATED);
  }
}
export const CLOZE_TABLE = () => new ClozeTableFactory().instance() as ClozeTable;
