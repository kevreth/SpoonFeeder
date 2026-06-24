import { shuffle } from 'lodash';
import type { AnswerType, SlideInterface } from '../../../slide/slideInterface';
import { RANDOM } from '../../../dataaccess/webstorage/webStorage';
import { Slide } from '../../../slide/slide';
import type { AdocVisitorInterface } from '../../misc/adocVisitor';
import { AdocVisitor } from '../../misc/adocVisitor';
import type { SlideType } from '../../misc/slideType';
export class Mc extends Slide implements SlideType {
  o: string[] = [];
  setProperties(props: SlideInterface): void {
    ({
      txt: this.txt,
      o: this.o,
      exp: this.exp,
      ref: this.ref,
      isExercise: this.isExercise,
    } = props);
    this.accept(new AdocVisitor());
    this.ans = this.o[0] as AnswerType;
    const shuffleFlag = this.isExercise && RANDOM.is();
    if (shuffleFlag) this.o = shuffle(this.o);
  }
  accept(visitor: AdocVisitorInterface): void {
    visitor.visitMc(this);
  }
}
