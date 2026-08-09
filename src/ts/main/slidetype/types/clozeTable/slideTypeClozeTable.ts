import type { SlideInterface } from '../../../slide/slideInterface';
import { Slide } from '../../../slide/slide';
import type { AdocVisitorInterface } from '../../misc/adocVisitor';
import { AdocVisitor } from '../../misc/adocVisitor';
import type { SlideType } from '../../misc/slideType';
// Cloze — dropdown in table. Same evaluation shape as ClozeText (N
// independent per-row judgments, Evaluate.GAP/Result.CORRELATED), but rows
// come from `o` (one row label per entry) instead of (N)-marked prose, and
// render as a table instead of inline text.
export class ClozeTable extends Slide implements SlideType {
  setProperties(props: SlideInterface): void {
    ({
      txt: this.txt,
      o: this.o,
      ans: this.ans,
      choices: this.choices,
      isExercise: this.isExercise,
    } = props);
    this.accept(new AdocVisitor());
  }
  accept(visitor: AdocVisitorInterface): void {
    visitor.visitClozeTable(this);
  }
  getAnswerCount(): number {
    return this.ans.length;
  }
}
