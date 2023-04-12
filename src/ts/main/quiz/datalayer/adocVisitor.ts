import { Bool } from '../slide/slideType/bool/slideTypeBool';
import { Gap } from '../slide/slideType/gap/slideTypeGap';
import { Imap } from '../slide/slideType/imap/slideTypeImap';
import { Info } from '../slide/slideType/info/slideTypeInfo';
import { Ma } from '../slide/slideType/ma/slideTypeMa';
import { Mc } from '../slide/slideType/mc/slideTypeMc';
import { Select } from '../slide/slideType/select/slideTypeSelect';
import { Sort } from '../slide/slideType/sort/slideTypeSort';
import { Vocab } from '../slide/slideType/vocab/slideTypeVocab';
import type { SlideInterface } from '../slideInterface';
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
  slide.exp = adoc2html(slide.exp as string);
  slide.ref = adoc2html(slide.ref as string);
}
export function optionsReplacement(options: Array<string>) {
  const retval = options.map((item) => {
    if (typeof item === 'string') item = adoc2html(item);
    return item;
  });
  return retval;
}
