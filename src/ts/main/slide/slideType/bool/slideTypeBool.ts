import type { AdocVisitorInterface } from '../../../datalayer/mediator';
import { AdocVisitor } from '../../../datalayer/mediator';
import type { SlideInterfaceProperties } from '../../slideInterface';
import { Mc } from '../mc/slideTypeMc';
import type { SlideType } from '../slideType';
//bool is a special case of Mc.
export class Bool extends Mc implements SlideType {
  o = ['yes', 'no'];
  setProperties(props: SlideInterfaceProperties): void {
    ({ txt: this.txt, ans: this.ans, isExercise: this.isExercise } = props);
    this.accept(new AdocVisitor());
  }
  accept(visitor: AdocVisitorInterface): void {
    visitor.visitBool(this);
  }
}
