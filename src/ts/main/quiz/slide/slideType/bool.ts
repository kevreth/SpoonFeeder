import { Mc } from './mc';
//bool is a special case of Mc.
export class Bool extends Mc {
  o = ['yes', 'no'];
  constructor() {
    //this is a bit hackish; it changes the type value directly
    //this should be solved by factoring out a common base class from mc
    //that both mc and bool derive from.
    super();
    this.type = 'bool';
  }
  processJson(json: Mc): void {
    ({ txt: this.txt, ans: this.ans, isExercise: this.isExercise } = json);
  }
}
