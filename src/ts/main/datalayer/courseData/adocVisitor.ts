import type { SlideInterface } from '../../slide/slideInterface';
import { Bool } from '../../slidetype/types/bool/slideTypeBool';
import { Gap } from '../../slidetype/types/gap/slideTypeGap';
import { Imap } from '../../slidetype/types/imap/slideTypeImap';
import { Info } from '../../slidetype/types/info/slideTypeInfo';
import { Ma } from '../../slidetype/types/ma/slideTypeMa';
import { Mc } from '../../slidetype/types/mc/slideTypeMc';
import { Select } from '../../slidetype/types/select/slideTypeSelect';
import { Sort } from '../../slidetype/types/sort/slideTypeSort';
import { Vocab } from '../../slidetype/types/vocab/slideTypeVocab';
import { adoc2html } from './adoc2html';

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
