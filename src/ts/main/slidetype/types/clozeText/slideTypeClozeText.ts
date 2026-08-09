import type { SlideInterface } from '../../../slide/slideInterface';
import { Slide } from '../../../slide/slide';
import type { AdocVisitorInterface } from '../../misc/adocVisitor';
import { AdocVisitor } from '../../misc/adocVisitor';
import type { SlideType } from '../../misc/slideType';
// Cloze — dropdown in text. `txt` carries (1)(2)(3)-style blank markers, same
// convention as Gap. Unlike Gap's shared drag-and-drop token pool, each blank
// has its own fixed dropdown option list (`choices`), selected by clicking
// rather than dragging. Evaluated the same way as Gap: N independent
// per-blank judgments (Evaluate.GAP/Result.CORRELATED).
export class ClozeText extends Slide implements SlideType {
  setProperties(props: SlideInterface): void {
    ({
      txt: this.txt,
      ans: this.ans,
      choices: this.choices,
      isExercise: this.isExercise,
    } = props);
    this.accept(new AdocVisitor());
  }
  accept(visitor: AdocVisitorInterface): void {
    visitor.visitClozeText(this);
  }
  getAnswerCount(): number {
    return this.ans.length;
  }
}
