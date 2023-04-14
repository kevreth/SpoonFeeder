import { SlideInitializer } from '../../slideInitializer'
import type { SlideInterface } from '../../slideInterface'
import { CreateHtml, CreateHtmlType } from '../../strategies/createHtmlStrategy'
import { Evaluate } from '../../strategies/evaluateStrategy'
import { MakeSlidesStrategy, MakeSlidesType } from '../../strategies/makeSlidesStrategy'
import { Result } from '../../strategies/resultStrategy'
import { Imap } from './slideTypeImap'

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
