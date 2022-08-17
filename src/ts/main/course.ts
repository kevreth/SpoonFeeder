export type SlideType = ccq|mc|gap|info|select|vocab|imap|sort;
export class Course {
    name:string;
    units:Array<Unit>;
}
export class Unit {
    name:string;
    lessons:Array<Lesson>;
}
export class Lesson {
    name:string;
    modules:Array<Module>
}
export class Module {
    name:string;
    inst:Array<SlideType>;
    exercises:Array<SlideType>;
}
// export abstract class inst {
//     pre:Array<SlideType>;
//     infos:Array<string>;
//     ccqs:Array<ccq>;
// }
export abstract class Slides {
    slides: Array<SlideType>;
}
export abstract class slide {
    type: string;
    isExercise: boolean;
}
export class bool extends slide {
    txt:string;
    ans:string;
}
export class gap extends slide {
    txt:    string;
    ans:     Array<string>;
}
export class imap extends slide {
    txt:string;
    img:string;
    ans:string;
}
export class mc extends slide {
    txt:    string;
    o:    Array<string>;
    ans:  string;
}
export class select extends slide {
    inst:    string;
    txt:    string;
    ans:     Array<number>;
}
export class sort extends slide {
    txt:string;
    ans:Array<string>;
}
export class vocab extends slide {
    list: Map<string,string>;
}
//this is not the format in the course file,
//where info is just a string.
export class info extends slide {
    txt:string;
    subtype:string;
    constructor() {
        super();
        this.type="info";
    }
}
export class ccq extends slide {
    txt:    string;
    o:    Array<string>;
    ans:  string;
}