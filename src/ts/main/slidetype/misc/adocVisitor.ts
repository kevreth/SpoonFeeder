import type { SlideInterface } from '../../slide/slideInterface';
import { adoc2html } from '../../slide/adoc2html';
export interface AdocVisitorInterface {
  visitBool(clazz: SlideInterface): void;
  visitGap(clazz: SlideInterface): void;
  visitImap(clazz: SlideInterface): void;
  visitInfo(clazz: SlideInterface): void;
  visitMa(clazz: SlideInterface): void;
  visitMc(clazz: SlideInterface): void;
  visitSelect(clazz: SlideInterface): void;
  visitSort(clazz: SlideInterface): void;
  visitVocab(clazz: SlideInterface): void;
}
export class AdocVisitor implements AdocVisitorInterface {
  visitBool(clazz: SlideInterface): void {
    stdReplacement(clazz);
  }
  visitGap(clazz: SlideInterface): void {
    stdReplacement(clazz);
  }
  visitImap(clazz: SlideInterface): void {
    stdReplacement(clazz);
  }
  visitInfo(clazz: SlideInterface): void {
    stdReplacement(clazz);
  }
  visitMa(clazz: SlideInterface): void {
    stdReplacement(clazz);
    clazz.o = optionsReplacement(clazz.o);
  }
  visitMc(clazz: SlideInterface): void {
    stdReplacement(clazz);
    clazz.o = optionsReplacement(clazz.o);
  }
  visitSelect(clazz: SlideInterface): void {
    stdReplacement(clazz);
  }
  visitSort(clazz: SlideInterface): void {
    stdReplacement(clazz);
  }
  visitVocab(clazz: SlideInterface): void {
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
