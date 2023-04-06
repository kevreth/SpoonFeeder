import { AdocVisitor, AdocVisitorInterface } from '../../datalayer/adocVisitor';
import { Mc } from './mc';
//bool is a special case of Mc.
export class Bool extends Mc {
  o = ['yes', 'no'];
  processJson(json: Mc): void {
    ({ txt: this.txt, ans: this.ans, isExercise: this.isExercise } = json);
    this.accept(new AdocVisitor());
  }
  accept(visitor: AdocVisitorInterface): void {
    visitor.visitBool(this);
  }
}
