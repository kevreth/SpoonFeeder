import type { SlideInterface } from '../../../slide/slideInterface';
import { Slide } from '../../../slide/slide';
import type { AdocVisitorInterface } from '../../misc/adocVisitor';
import { AdocVisitor } from '../../misc/adocVisitor';
import type { SlideType } from '../../misc/slideType';
// Matrix/grid — multiple response. Rows (`o`) x shared columns (`cols`);
// each row can pick more than one column. AnswerType has no string[][]
// variant for per-row multi-selection, so ans/res are string[] of
// canonical, sorted comma-joined column NAME lists per row (e.g.
// "Cardiovascular,Renal") — names rather than indices so the summary/review
// row (which renders raw String(res)/String(ans)) stays readable.
// Evaluated the same way as Gap: N independent per-row judgments
// (Evaluate.GAP/Result.CORRELATED) — the canonical encoding makes row
// equality a plain string comparison.
export function canonicalizeColumns(names: string[]): string {
  return [...names].sort().join(',');
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
      canonicalizeColumns(row.split(',').map((name) => name.trim())),
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
