import { Vocab } from './slideTypeVocab';
import type { CreateHtmlTypeIntersection } from '../../strategies/createHtmlStrategy';
import { CreateHtml } from '../../strategies/createHtmlStrategy';
import { Evaluate } from '../../strategies/evaluateStrategy';
import { MakeSlidesStrategy } from '../../strategies/makeSlidesStrategy';
import { Result } from '../../strategies/resultStrategy';
import type { SlideInterface } from '../../slideInterface';
import { SlideInitializer } from '../../slideInitializer';

export class VocabFactory extends SlideInitializer {
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
export const VOCAB = () => new VocabFactory().instance() as Vocab;
