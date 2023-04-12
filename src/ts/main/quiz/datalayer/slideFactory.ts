import { Bool } from '../slide/slideType/bool/slideTypeBool';
import { Gap } from '../slide/slideType/gap/slideTypeGap';
import { Imap } from '../slide/slideType/imap/slideTypeImap';
import { Info } from '../slide/slideType/info/slideTypeInfo';
import { Ma } from '../slide/slideType/ma/slideTypeMa';
import { Mc } from '../slide/slideType/mc/slideTypeMc';
import { Select } from '../slide/slideType/select/slideTypeSelect';
import { Sort } from '../slide/slideType/sort/slideTypeSort';
import { Vocab } from '../slide/slideType/vocab/slideTypeVocab';
import type { CreateHtmlTypeIntersection } from '../slide/strategies/createHtmlStrategy';
import { CreateHtml } from '../slide/strategies/createHtmlStrategy';
import { Evaluate } from '../slide/strategies/evaluateStrategy';
import { MakeSlidesStrategy } from '../slide/strategies/makeSlidesStrategy';
import { Result } from '../slide/strategies/resultStrategy';
import type { SlideInterface } from '../slideInterface';
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
      MakeSlidesStrategy.MC,
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
      MakeSlidesStrategy.GAP,
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
      MakeSlidesStrategy.IMAP,
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
      MakeSlidesStrategy.INFO,
      Evaluate.DEFAULT,
      Result.UNSUPPORTED
    );
  }
}
class MaFactory extends SlideInitializer {
  constructor() {
    super('ma');
  }
  public instance(): SlideInterface {
    return new Ma(
      this.type,
      CreateHtml.MA as CreateHtmlTypeIntersection,
      MakeSlidesStrategy.MA,
      Evaluate.SIMPLE,
      Result.SIMPLE
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
      MakeSlidesStrategy.MC,
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
      MakeSlidesStrategy.SELECT,
      Evaluate.SIMPLE,
      Result.SIMPLE
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
      MakeSlidesStrategy.SORT,
      Evaluate.SIMPLE,
      Result.SIMPLE
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
      MakeSlidesStrategy.MC,
      Evaluate.SIMPLE,
      Result.CORRELATED
    );
  }
}
const values = [
  new BoolFactory(),
  new GapFactory(),
  new ImapFactory(),
  new InfoFactory(),
  new MaFactory(),
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
  const slides = slide.getSlideSet();
  if (slides.length > 0) return slides;
  return slide;
}
export const BOOL = () => new BoolFactory().instance() as Bool;
export const GAP = () => new GapFactory().instance() as Gap;
export const IMAP = () => new ImapFactory().instance() as Imap;
export const INFO = () => new InfoFactory().instance() as Info;
export const MA = () => new McFactory().instance() as Ma;
export const MC = () => new McFactory().instance() as Mc;
export const SELECT = () => new SelectFactory().instance() as Select;
export const SORT = () => new SortFactory().instance() as Sort;
export const VOCAB = () => new VocabFactory().instance() as Vocab;
