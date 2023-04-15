import type { SlideInterface } from '../../slide/mediator';

export abstract class SlideInitializer {
  constructor(public readonly type: string) {}
  public abstract instance(): SlideInterface;
}
