import { AdocVisitor, AdocVisitorInterface } from '../../datalayer/adocVisitor';
import { SlideInterface } from '../../slideInterface';
import { Mc } from './mc';
//bool is a special case of Mc.
export class Bool extends Mc {
  o = ['yes', 'no'];
  processJson(json: SlideInterface): void {
    const json1 = json as Mc
    ({ txt: this.txt, ans: this.ans, isExercise: this.isExercise } = json1);
    this.accept(new AdocVisitor());
  }
  accept(visitor: AdocVisitorInterface): void {
    visitor.visitBool(this);
  }
}
