import type { SlideInterface } from '../../../slide/index';
import { SlideInitializer } from '../../misc/slideInitializer';
import { Evaluate } from '../../strategies/evaluateStrategy';
import { Result } from '../../strategies/resultStrategy';
import { MatrixSingle } from './slideTypeMatrixSingle';

export class MatrixSingleFactory extends SlideInitializer {
  constructor() {
    super('matrix-single');
  }
  public instance(): SlideInterface {
    return new MatrixSingle(this.type, Evaluate.GAP, Result.CORRELATED);
  }
}
export const MATRIX_SINGLE = () =>
  new MatrixSingleFactory().instance() as MatrixSingle;
