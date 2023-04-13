import { Imap } from './slideTypeImap';
import type { CreateHtmlTypeIntersection } from '../../strategies/createHtmlStrategy';
import { CreateHtml } from '../../strategies/createHtmlStrategy';
import { Evaluate } from '../../strategies/evaluateStrategy';
import { MakeSlidesStrategy } from '../../strategies/makeSlidesStrategy';
import { Result } from '../../strategies/resultStrategy';
import type { SlideInterface } from '../../slideInterface';
import { SlideInitializer } from '../../slideInitializer';

export class ImapFactory extends SlideInitializer {
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
export const IMAP = () => new ImapFactory().instance() as Imap;
