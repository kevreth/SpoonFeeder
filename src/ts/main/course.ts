export type SlideType = ccq|mc|gap|info|select|vocab|imap|sort;
export class Course {
    name:string="";
    units:Array<Unit>= new Array;
}
export class Unit {
    name:string="";
    lessons:Array<Lesson>= new Array;
}
export class Lesson {
    name:string="";
    modules:Array<Module>= new Array;
}
export class Module {
    name:string="";
    inst:Array<SlideType>= new Array;
    exercises:Array<SlideType>= new Array;
}
// export abstract class inst {
//     pre:Array<SlideType>;
//     infos:Array<string>;
//     ccqs:Array<ccq>;
// }
export abstract class Slides {
    slides: Array<SlideType>= new Array;
}
export abstract class slide {
    type: string="";
    isExercise: boolean = false;
}
export class bool extends slide {
    txt:string="";
    ans:string="";
}
export class gap extends slide {
    txt:    string="";
    ans:     Array<string>= new Array;;
}
export class imap extends slide {
    txt:string="";
    img:string="";
    ans:string="";
}
export class mc extends slide {
    txt:    string="";
    o:    Array<string>= new Array;;
    ans:  string="";
}
export class select extends slide {
    inst:    string="";
    txt:    string="";
    ans:     Array<number>= new Array;;
}
export class sort extends slide {
    txt:string="";
    ans:Array<string>= new Array;;
}
export class vocab extends slide {
    list: Map<string,string>= new Map;
}
//this is not the format in the course file,
//where info is just a string.
export class info extends slide {
    txt:string="";
    subtype:string="";
    constructor() {
        super();
        this.type="info";
    }
}
export class ccq extends slide {
    txt:    string="";
    o:    Array<string>= new Array;;
    ans:  string="";
}