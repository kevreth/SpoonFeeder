import type { SlideInterface } from '../../../slide/mediator';
import { SlideInitializer } from '../../misc/slideInitializer';
import type { CreateHtmlType } from '../../strategies/createHtmlStrategy';
import { CreateHtml } from '../../strategies/createHtmlStrategy';
import { Evaluate } from '../../strategies/evaluateStrategy';
import type { MakeSlidesType } from '../../strategies/makeSlidesStrategy';
import { MakeSlidesStrategy } from '../../strategies/makeSlidesStrategy';
import { Result } from '../../strategies/resultStrategy';
import { Imap } from './slideTypeImap';

export class ImapFactory extends SlideInitializer {
  constructor() {
    super('imap');
  }
  public instance(): SlideInterface {
    return new Imap(
      this.type,
      CreateHtml.IMAP as CreateHtmlType,
      MakeSlidesStrategy.IMAP as MakeSlidesType,
      Evaluate.SIMPLE,
      Result.SIMPLE
    );
  }
}
export const IMAP = () => new ImapFactory().instance() as Imap;
