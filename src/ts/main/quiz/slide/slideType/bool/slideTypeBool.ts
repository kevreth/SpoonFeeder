import type { AdocVisitorInterface } from '../../../datalayer/mediator';
import { AdocVisitor } from '../../../datalayer/mediator';
import type { SlideInterface } from '../../../slideInterface';

import { Mc } from '../mc/slideTypeMc';
import { SlideType } from '../slideType';
//bool is a special case of Mc.
export class Bool extends Mc implements SlideType  {
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
