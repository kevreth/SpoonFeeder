import { shuffle } from 'lodash';
import type { AnswerType, SlideInterface } from '../../../slide/slideInterface';
import { RANDOM } from '../../../dataaccess/webstorage/webStorage';
import { Slide } from '../../../slide/slide';
import type { AdocVisitorInterface } from '../../misc/adocVisitor';
import { AdocVisitor } from '../../misc/adocVisitor';
import type { SlideType } from '../../misc/slideType';
export class Ma extends Slide implements SlideType {
  setProperties(props: SlideInterface): void {
    ({
      txt: this.txt,
      o: this.o,
      exp: this.exp,
      ref: this.ref,
      isExercise: this.isExercise,
      numans: this.numans,
    } = props);
    this.accept(new AdocVisitor());
    const answers: string[] = [];
    const numans = this.numans as number;
    const o = this.o as string[];
    for (let i = 0; i < numans; i++) {
      answers.push(o[i]);
    }
    this.ans = answers.sort() as AnswerType;
    this.o = o;
    this.numans = numans;
    const shuffleFlag = this.isExercise && RANDOM.is();
    if (shuffleFlag) this.o = shuffle(o);
  }
  accept(visitor: AdocVisitorInterface): void {
    visitor.visitMa(this);
  }
}
