import type { SlideInterface } from '../../../slide/slideInterface';
import { Slide } from '../../../slide/slide';
import type { AdocVisitorInterface } from '../../misc/adocVisitor';
import { AdocVisitor } from '../../misc/adocVisitor';
import type { SlideType } from '../../misc/slideType';
// Matrix/grid — multiple response. Rows (`o`) x shared columns (`cols`);
// each row can pick more than one column. AnswerType has no string[][]
// variant for per-row multi-selection, so ans/res are string[] of
// canonical, sorted comma-joined column-index lists per row (e.g. "0,2").
// Evaluated the same way as Gap: N independent per-row judgments
// (Evaluate.GAP/Result.CORRELATED) — the canonical encoding makes row
// equality a plain string comparison.
export function canonicalizeColumnIndices(indices: number[]): string {
  return [...indices].sort((a, b) => a - b).join(',');
}
export class MatrixMulti extends Slide implements SlideType {
  setProperties(props: SlideInterface): void {
    ({
      txt: this.txt,
      o: this.o,
      cols: this.cols,
      isExercise: this.isExercise,
    } = props);
    this.ans = (props.ans as string[]).map((row) =>
      canonicalizeColumnIndices(row.split(',').map(Number)),
    );
    this.accept(new AdocVisitor());
  }
  accept(visitor: AdocVisitorInterface): void {
    visitor.visitMatrixMulti(this);
  }
  getAnswerCount(): number {
    return this.ans.length;
  }
}
