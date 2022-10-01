import type { SlideInterface } from '../SlideInterface';
import { Bool } from './slideType/bool';
import { Gap } from './slideType/gap';
import { Imap } from './slideType/imap';
import { Info } from './slideType/info';
import { Mc } from './slideType/mc';
import { Select } from './slideType/select';
import { Sort } from './slideType/sort';
import { Vocab } from './slideType/vocab';
import type { CreateHtmlTypeIntersection } from './strategies/createHtml';
import { CreateHtml } from './strategies/createHtml';
import { Evaluate } from './strategies/evaluate';
import { MakeSlides } from './strategies/makeSlides';
import { Result } from './strategies/result';
export class SlideFactory {
  private static get values(): string[] {
    return ['bool', 'gap', 'imap', 'info', 'mc', 'select', 'sort', 'vocab'];
  }
  public static getInstance(instanceType: string): SlideInterface | undefined {
    const values = SlideFactory.values;
    const numTypes = values.length;
    for (let i = 0; i < numTypes; i++) {
      const type = values[i];
      if (type === instanceType) {
        switch (values[i]) {
          case 'bool':
            return new Bool(
              type,
              CreateHtml.MC as CreateHtmlTypeIntersection,
              MakeSlides.MC,
              Evaluate.SIMPLE,
              Result.SIMPLE
            );
          case 'gap':
            return new Gap(
              type,
              CreateHtml.GAP as CreateHtmlTypeIntersection,
              MakeSlides.GAP,
              Evaluate.GAP,
              Result.CORRELATED
            );
          case 'imap':
            return new Imap(
              type,
              CreateHtml.IMAP as CreateHtmlTypeIntersection,
              MakeSlides.IMAP,
              Evaluate.SIMPLE,
              Result.SIMPLE
            );
          case 'info':
            return new Info(
              type,
              CreateHtml.INFO as CreateHtmlTypeIntersection,
              MakeSlides.INFO,
              Evaluate.DEFAULT,
              Result.UNSUPPORTED
            );
          case 'mc':
            return new Mc(
              type,
              CreateHtml.MC as CreateHtmlTypeIntersection,
              MakeSlides.MC,
              Evaluate.SIMPLE,
              Result.SIMPLE
            );
          case 'select':
            return new Select(
              type,
              CreateHtml.SELECT as CreateHtmlTypeIntersection,
              MakeSlides.SELECT,
              Evaluate.SIMPLE,
              Result.LIST
            );
          case 'sort':
            return new Sort(
              type,
              CreateHtml.SORT as CreateHtmlTypeIntersection,
              MakeSlides.SORT,
              Evaluate.SIMPLE,
              Result.LIST
            );
          case 'vocab':
            return new Vocab(
              type,
              CreateHtml.MC as CreateHtmlTypeIntersection,
              MakeSlides.VOCAB,
              Evaluate.VOCAB,
              Result.CORRELATED
            );
        }
      }
    }
  }
}
