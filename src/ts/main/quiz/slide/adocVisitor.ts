import { adoc2html } from './adoc2html';
import { Gap } from './slideType/gap';
import { Info } from './slideType/info';
import { Mc } from './slideType/mc';

export interface AdocVisitorInterface {
  visitGap(clazz: Gap): void;
  visitInfo(clazz: Info): void;
  visitMc(clazz: Mc): void;
}
export class AdocVisitor implements AdocVisitorInterface {
  visitGap(clazz: Gap): void {
    clazz.txt = adoc2html(clazz.txt);
  }
  visitInfo(clazz: Info): void {
    clazz.txt = adoc2html(clazz.txt);
  }
  visitMc(clazz: Mc): void {
    clazz.txt = adoc2html(clazz.txt);
    clazz.o = clazz.o.map((item) => {
      console.log(item);
      if(typeof item === 'string')
        item = adoc2html(item);
      return item;
    });
  }
}
