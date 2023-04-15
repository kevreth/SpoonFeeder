import type { AdocVisitorInterface } from '../../../datalayer/mediator';
import { AdocVisitor } from '../../../datalayer/mediator';
import type { SlideInterface } from '../../../slide/slideInterface';
import type { SlideType } from '../../misc/slideType';
import { Mc } from '../mc/slideTypeMc';
//bool is a special case of Mc.
export class Bool extends Mc implements SlideType {
  o = ['yes', 'no'];
  setProperties(props: SlideInterface): void {
    ({ txt: this.txt, ans: this.ans, isExercise: this.isExercise } = props);
    this.accept(new AdocVisitor());
  }
  accept(visitor: AdocVisitorInterface): void {
    visitor.visitBool(this);
  }
}
