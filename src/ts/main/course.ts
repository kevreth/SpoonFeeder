export type SlideType = ccq | mc | gap | info | select | vocab | imap | sort;
export class Course {
  name = '';
  units: Array<Unit> = [];
}
export class Unit {
  name = '';
  lessons: Array<Lesson> = [];
}
export class Lesson {
  name = '';
  modules: Array<Module> = [];
}
export class Module {
  name = '';
  inst: Array<SlideType> = [];
  exercises: Array<SlideType> = [];
}
// export abstract class inst {
//     pre:Array<SlideType>;
//     infos:Array<string>;
//     ccqs:Array<ccq>;
// }
export abstract class Slides {
  slides: Array<SlideType> = [];
}
export abstract class slide {
  type = '';
  isExercise = false;
}
export class bool extends slide {
  txt = '';
  ans = '';
}
export class gap extends slide {
  txt = '';
  ans: Array<string> = [];
}
export class imap extends slide {
  txt = '';
  img = '';
  ans = '';
}
export class mc extends slide {
  txt = '';
  o: Array<string> = [];
  ans = '';
}
export class select extends slide {
  inst = '';
  txt = '';
  ans: Array<number> = [];
}
export class sort extends slide {
  txt = '';
  ans: Array<string> = [];
}
export class vocab extends slide {
  list: Map<string, string> = new Map();
}
//this is not the format in the course file,
//where info is just a string.
export class info extends slide {
  txt = '';
  subtype = '';
  constructor() {
    super();
    this.type = 'info';
  }
}
export class ccq extends slide {
  txt = '';
  o: Array<string> = [];
  ans = '';
}
