import type { SlideInterface } from '../../../slide/index';
import { SlideInitializer } from '../../misc/slideInitializer';
import { Evaluate } from '../../strategies/evaluateStrategy';
import { Result } from '../../strategies/resultStrategy';
import { Imap } from './slideTypeImap';

export class ImapFactory extends SlideInitializer {
  constructor() {
    super('imap');
  }
  public instance(): SlideInterface {
    return new Imap(this.type, Evaluate.SIMPLE, Result.SIMPLE);
  }
}
export const IMAP = () => new ImapFactory().instance() as Imap;
