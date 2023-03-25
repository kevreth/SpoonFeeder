import { adoc2html } from './adoc2html';
import { Gap } from './slideType/gap';
import { Imap } from './slideType/imap';
import { Info } from './slideType/info';
import { Ma } from './slideType/ma';
import { Mc } from './slideType/mc';
import { Select } from './slideType/select';
import { Sort } from './slideType/sort';
import { Vocab } from './slideType/vocab';

export interface AdocVisitorInterface {
  visitGap(clazz: Gap): void;
  visitImap(clazz: Imap): void;
  visitInfo(clazz: Info): void;
  visitMa(clazz: Ma): void;
  visitMc(clazz: Mc): void;
  visitSelect(clazz: Select): void;
  visitSort(clazz: Sort): void;
  visitVocab(clazz: Vocab): void;
}
export class AdocVisitor implements AdocVisitorInterface {
  visitGap(clazz: Gap): void {
    clazz.txt = adoc2html(clazz.txt);
  }
  visitImap(clazz: Imap): void {
    clazz.txt = adoc2html(clazz.txt);
  }
  visitInfo(clazz: Info): void {
    clazz.txt = adoc2html(clazz.txt);
  }
  visitMa(clazz: Ma): void {
    clazz.txt = adoc2html(clazz.txt);
  }
  visitMc(clazz: Mc): void {
    clazz.txt = adoc2html(clazz.txt);
    clazz.o = clazz.o.map((item) => {
      if(typeof item === 'string')
        item = adoc2html(item);
      return item;
    });
  }
  visitSelect(clazz: Select): void {
    clazz.txt = adoc2html(clazz.txt);
  }
  visitSort(clazz: Sort): void {
    clazz.txt = adoc2html(clazz.txt);
  }
  visitVocab(clazz: Vocab): void {
    clazz.txt = clazz.txt;
  }
}
