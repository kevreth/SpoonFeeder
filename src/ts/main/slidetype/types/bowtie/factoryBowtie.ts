import type { SlideInterface } from '../../../slide/index';
import { SlideInitializer } from '../../misc/slideInitializer';
import { Evaluate } from '../../strategies/evaluateStrategy';
import { Result } from '../../strategies/resultStrategy';
import { Bowtie } from './slideTypeBowtie';

export class BowtieFactory extends SlideInitializer {
  constructor() {
    super('bowtie');
  }
  public instance(): SlideInterface {
    return new Bowtie(this.type, Evaluate.GAP, Result.CORRELATED);
  }
}
export const BOWTIE = () => new BowtieFactory().instance() as Bowtie;
