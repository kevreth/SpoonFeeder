import { Bool } from './slide/slideType/bool';
import { Gap } from './slide/slideType/gap';
import { Imap } from './slide/slideType/imap';
import { Info } from './slide/slideType/info';
import { Mc } from './slide/slideType/mc';
import { Select } from './slide/slideType/select';
import { Sort } from './slide/slideType/sort';
import { Vocab } from './slide/slideType/vocab';
import type { CreateHtmlTypeIntersection } from './slide/strategies/createHtmlStrategy';
import { CreateHtml } from './slide/strategies/createHtmlStrategy';
import { Evaluate } from './slide/strategies/evaluateStrategy';
import { MakeSlides } from './slide/strategies/makeSlidesStrategy';
import { Result } from './slide/strategies/resultStrategy';
import type { SlideInterface } from './slideInterface';
abstract class SlideInitializer {
  constructor(public readonly type: string) {}
  public abstract instance(): SlideInterface;
}
class BoolFactory extends SlideInitializer {
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
class GapFactory extends SlideInitializer {
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
class ImapFactory extends SlideInitializer {
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
class InfoFactory extends SlideInitializer {
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
class McFactory extends SlideInitializer {
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
class SelectFactory extends SlideInitializer {
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
class SortFactory extends SlideInitializer {
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
class VocabFactory extends SlideInitializer {
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
const values = [
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
export function initSlide(exercise: SlideInterface) {
  const type = exercise.type;
  const slide = getInstance(type);
  slide.processJson(exercise);
  return slide;
}
export const BOOL = () => new BoolFactory().instance() as Bool;
export const GAP = () => new GapFactory().instance() as Gap;
export const IMAP = () => new ImapFactory().instance() as Imap;
export const INFO = () => new InfoFactory().instance() as Info;
export const MC = () => new McFactory().instance() as Mc;
export const SELECT = () => new SelectFactory().instance() as Select;
export const SORT = () => new SortFactory().instance() as Sort;
export const VOCAB = () => new VocabFactory().instance() as Vocab;
