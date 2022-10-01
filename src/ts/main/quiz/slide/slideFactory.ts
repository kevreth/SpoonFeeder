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
export class BOOL extends SlideInitializer {
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
export class GAP extends SlideInitializer {
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
export class IMAP extends SlideInitializer {
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
export class INFO extends SlideInitializer {
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
export class MC extends SlideInitializer {
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
export class SELECT extends SlideInitializer {
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
export class SORT extends SlideInitializer {
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
export class VOCAB extends SlideInitializer {
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
  new BOOL(),
  new GAP(),
  new IMAP(),
  new INFO(),
  new MC(),
  new SELECT(),
  new SORT(),
  new VOCAB(),
];
export function getInstance(type: string): SlideInterface {
  let retval = new INFO().instance();
  values.forEach((value) => {
    if (type == value.type) {
      retval = value.instance();
    }
  });
  return retval;
}
