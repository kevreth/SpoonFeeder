import type { SlideInterface } from '../../../slide/slideInterface';
import { Slide } from '../../../slide/slide';
import type { AdocVisitorInterface } from '../../misc/adocVisitor';
import { AdocVisitor } from '../../misc/adocVisitor';
import type { SlideType } from '../../misc/slideType';
// Extended drag-and-drop: categorize each item in `o` into one of `bins`.
// ans/res are number[] (one bin index per item in `o`, in `o`'s order) —
// evaluated with the same Evaluate.GAP/Result.CORRELATED pairing as Gap,
// since both are "N independent per-item judgments" in shape.
export class Bins extends Slide implements SlideType {
  setProperties(props: SlideInterface): void {
    ({
      txt: this.txt,
      o: this.o,
      ans: this.ans,
      bins: this.bins,
      isExercise: this.isExercise,
    } = props);
    this.accept(new AdocVisitor());
  }
  accept(visitor: AdocVisitorInterface): void {
    visitor.visitBins(this);
  }
  getAnswerCount(): number {
    return this.ans.length;
  }
}
