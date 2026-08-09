import type { SlideInterface } from '../../../slide/slideInterface';
import { Slide } from '../../../slide/slide';
import type { AdocVisitorInterface } from '../../misc/adocVisitor';
import { AdocVisitor } from '../../misc/adocVisitor';
import type { SlideType } from '../../misc/slideType';
// Matrix/grid — single response. Rows (`o`) x shared columns (`cols`); each
// row picks exactly one column. ans/res are string[] — one correct column
// per row, parallel to `o`. Evaluated the same way as Gap/ClozeTable: N
// independent per-row judgments (Evaluate.GAP/Result.CORRELATED).
export class MatrixSingle extends Slide implements SlideType {
  setProperties(props: SlideInterface): void {
    ({
      txt: this.txt,
      o: this.o,
      cols: this.cols,
      ans: this.ans,
      isExercise: this.isExercise,
    } = props);
    this.accept(new AdocVisitor());
  }
  accept(visitor: AdocVisitorInterface): void {
    visitor.visitMatrixSingle(this);
  }
  getAnswerCount(): number {
    return this.ans.length;
  }
}
