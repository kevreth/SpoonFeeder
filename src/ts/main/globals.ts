import {SlideInterface} from './slide'
export const ROW = '<tr><td>%Q%</td><td>%N%.</td><td>%A%</td><td>%C%</td></tr>';
class Json {
    private counter = 0;
    private json:Array<SlideInterface>;
    get() {
        return this.json;
    }
    set(json:Array<SlideInterface> ) {
        this.json=json;
    }
    getSlide() {
        const retval = this.json[this.counter];
        this.counter++;
        return retval;
    }
    getNumSlides():number {
        return this.json.length;
    }
    push(slide:SlideInterface) {
        this.json.push(slide);
    }
    reset():void {
        this.counter=0;
    }
    count():number {
        return this.counter;
    }
}
export class Globals {
    static readonly JSON = new Json();
}