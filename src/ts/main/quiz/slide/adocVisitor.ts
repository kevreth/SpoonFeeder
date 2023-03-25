import { SlideInterface } from '../slideInterface';
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
    stdReplacement(clazz);
  }
  visitImap(clazz: Imap): void {
    stdReplacement(clazz);
  }
  visitInfo(clazz: Info): void {
    stdReplacement(clazz);
  }
  visitMa(clazz: Ma): void {
    stdReplacement(clazz);
    clazz.o = optionsReplacement(clazz.o);
  }
  visitMc(clazz: Mc): void {
    stdReplacement(clazz);
    clazz.o = optionsReplacement(clazz.o);
  }
  visitSelect(clazz: Select): void {
    stdReplacement(clazz);
  }
  visitSort(clazz: Sort): void {
    stdReplacement(clazz);
  }
  visitVocab(clazz: Vocab): void {
    clazz.txt = clazz.txt;
    clazz.list.forEach((value, key, map) => {
      map.set(key, adoc2html(value));
    });
  }
}
export function stdReplacement(slide: SlideInterface) {
  slide.txt = adoc2html(slide.txt);
  slide.exp = adoc2html(slide.exp);
  slide.ref = adoc2html(slide.ref);
}
export function optionsReplacement(options: Array<string>) {
  const retval = options.map((item) => {
    if(typeof item === 'string')
      item = adoc2html(item);
    return item;
  });
  return retval;
}
