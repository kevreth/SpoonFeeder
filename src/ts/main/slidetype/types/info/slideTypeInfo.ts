import type { SlideInterface } from '../../../slide/index';
import { Slide } from '../../../slide/index';
import type { AdocVisitorInterface } from '../../misc/adocVisitor';
import { AdocVisitor } from '../../misc/adocVisitor';
import type { SlideType } from '../../misc/slideType';
export class Info extends Slide implements SlideType {
  setProperties(props: SlideInterface): void {
    ({ txt: this.txt } = props);
    this.accept(new AdocVisitor());
    this.immediateConclusion = true;
  }
  accept(visitor: AdocVisitorInterface): void {
    visitor.visitInfo(this);
  }
}
