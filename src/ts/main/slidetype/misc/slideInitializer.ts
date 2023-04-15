import type { SlideInterface } from '../../slide/slideInterface';

export abstract class SlideInitializer {
  constructor(public readonly type: string) {}
  public abstract instance(): SlideInterface;
}
