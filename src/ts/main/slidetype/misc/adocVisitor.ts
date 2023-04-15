import { adoc2html } from '../../datalayer/courseData/adoc2html';
import type { SlideInterface } from '../../slide/mediator';
import { Bool } from '../types/bool/slideTypeBool';
import { Gap } from '../types/gap/slideTypeGap';
import { Imap } from '../types/imap/slideTypeImap';
import { Info } from '../types/info/slideTypeInfo';
import { Ma } from '../types/ma/slideTypeMa';
import { Mc } from '../types/mc/slideTypeMc';
import { Select } from '../types/select/slideTypeSelect';
import { Sort } from '../types/sort/slideTypeSort';
import { Vocab } from '../types/vocab/slideTypeVocab';

export interface AdocVisitorInterface {
  visitBool(clazz: Bool): void;
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
  visitBool(clazz: Bool): void {
    stdReplacement(clazz);
  }
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
    if (typeof item === 'string') item = adoc2html(item);
    return item;
  });
  return retval;
}
