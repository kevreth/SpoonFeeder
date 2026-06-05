import type { SlideInterface } from '../../../slide/index';
import { SlideInitializer } from '../../misc/slideInitializer';
import { Evaluate } from '../../strategies/evaluateStrategy';
import { Result } from '../../strategies/resultStrategy';
import { Vocab } from './slideTypeVocab';

export class VocabFactory extends SlideInitializer {
  constructor() {
    super('vocab');
  }
  public instance(): SlideInterface {
    return new Vocab(this.type, Evaluate.SIMPLE, Result.CORRELATED);
  }
}
export const VOCAB = () => new VocabFactory().instance() as Vocab;
