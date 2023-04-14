import { SlideInitializer } from '../../slideInitializer';
import type { SlideInterface } from '../../slideInterface';
import type { CreateHtmlType } from '../../strategies/createHtmlStrategy';
import { CreateHtml } from '../../strategies/createHtmlStrategy';
import { Evaluate } from '../../strategies/evaluateStrategy';
import type { MakeSlidesType } from '../../strategies/makeSlidesStrategy';
import { MakeSlidesStrategy } from '../../strategies/makeSlidesStrategy';
import { Result } from '../../strategies/resultStrategy';
import { Vocab } from './slideTypeVocab';

export class VocabFactory extends SlideInitializer {
  constructor() {
    super('vocab');
  }
  public instance(): SlideInterface {
    return new Vocab(
      this.type,
      CreateHtml.MC as CreateHtmlType,
      MakeSlidesStrategy.MC as MakeSlidesType,
      Evaluate.SIMPLE,
      Result.CORRELATED
    );
  }
}
export const VOCAB = () => new VocabFactory().instance() as Vocab;
