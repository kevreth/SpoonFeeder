import { SlideInterface } from '../../slide';
import { Mc, mc } from './mc';
//bool is a special case of Mc.
export interface bool extends SlideInterface {
  txt: string;
  ans: string;
}
export class Bool extends Mc {
  o = ['yes', 'no'];
  processJson(json: mc): void {
    ({ txt: this.txt, ans: this.ans, isExercise: this.isExercise } = json);
  }
}
