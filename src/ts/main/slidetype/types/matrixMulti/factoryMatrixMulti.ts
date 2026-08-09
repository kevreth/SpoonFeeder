import type { SlideInterface } from '../../../slide/index';
import { SlideInitializer } from '../../misc/slideInitializer';
import { Evaluate } from '../../strategies/evaluateStrategy';
import { Result } from '../../strategies/resultStrategy';
import { MatrixMulti } from './slideTypeMatrixMulti';

export class MatrixMultiFactory extends SlideInitializer {
  constructor() {
    super('matrix-multi');
  }
  public instance(): SlideInterface {
    return new MatrixMulti(this.type, Evaluate.GAP, Result.CORRELATED);
  }
}
export const MATRIX_MULTI = () =>
  new MatrixMultiFactory().instance() as MatrixMulti;
