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
export abstract class SlideInitializer {
  constructor(public readonly type: string) {}
  public abstract instance(): SlideInterface;
}
export class BoolFactory extends SlideInitializer {
  constructor() {
    super('bool');
  }
  public instance(): SlideInterface {
    return new Bool(
      this.type,
      CreateHtml.MC as CreateHtmlTypeIntersection,
      MakeSlides.MC,
      Evaluate.SIMPLE,
      Result.SIMPLE
    );
  }
}
export class GapFactory extends SlideInitializer {
  constructor() {
    super('gap');
  }
  public instance(): SlideInterface {
    return new Gap(
      this.type,
      CreateHtml.GAP as CreateHtmlTypeIntersection,
      MakeSlides.GAP,
      Evaluate.GAP,
      Result.CORRELATED
    );
  }
}
export class ImapFactory extends SlideInitializer {
  constructor() {
    super('imap');
  }
  public instance(): SlideInterface {
    return new Imap(
      this.type,
      CreateHtml.IMAP as CreateHtmlTypeIntersection,
      MakeSlides.IMAP,
      Evaluate.SIMPLE,
      Result.SIMPLE
    );
  }
}
export class InfoFactory extends SlideInitializer {
  constructor() {
    super('info');
  }
  public instance(): SlideInterface {
    return new Info(
      this.type,
      CreateHtml.INFO,
      MakeSlides.INFO,
      Evaluate.DEFAULT,
      Result.UNSUPPORTED
    );
  }
}
export class McFactory extends SlideInitializer {
  constructor() {
    super('mc');
  }
  public instance(): SlideInterface {
    return new Mc(
      this.type,
      CreateHtml.MC as CreateHtmlTypeIntersection,
      MakeSlides.MC,
      Evaluate.SIMPLE,
      Result.SIMPLE
    );
  }
}
export class SelectFactory extends SlideInitializer {
  constructor() {
    super('select');
  }
  public instance(): SlideInterface {
    return new Select(
      this.type,
      CreateHtml.SELECT as CreateHtmlTypeIntersection,
      MakeSlides.SELECT,
      Evaluate.SIMPLE,
      Result.LIST
    );
  }
}
export class SortFactory extends SlideInitializer {
  constructor() {
    super('sort');
  }
  public instance(): SlideInterface {
    return new Sort(
      this.type,
      CreateHtml.SORT as CreateHtmlTypeIntersection,
      MakeSlides.SORT,
      Evaluate.SIMPLE,
      Result.LIST
    );
  }
}
export class VocabFactory extends SlideInitializer {
  constructor() {
    super('vocab');
  }
  public instance(): SlideInterface {
    return new Vocab(
      this.type,
      CreateHtml.MC as CreateHtmlTypeIntersection,
      MakeSlides.VOCAB,
      Evaluate.VOCAB,
      Result.CORRELATED
    );
  }
}
export const values = [
  new BoolFactory(),
  new GapFactory(),
  new ImapFactory(),
  new InfoFactory(),
  new McFactory(),
  new SelectFactory(),
  new SortFactory(),
  new VocabFactory(),
];
export function getInstance(type: string): SlideInterface {
  let retval = new InfoFactory().instance();
  values.forEach((value) => {
    if (type == value.type) {
      retval = value.instance();
    }
  });
  return retval;
}
export const BOOL = () => new BoolFactory().instance() as Bool;
export const GAP = () => new GapFactory().instance() as Gap;
export const IMAP = () => new ImapFactory().instance() as Imap;
export const INFO = () => new InfoFactory().instance() as Info;
export const MC = () => new McFactory().instance() as Mc;
export const SELECT = () => new SelectFactory().instance() as Select;
export const SORT = () => new SortFactory().instance() as Sort;
export const VOCAB = () => new VocabFactory().instance() as Vocab;
