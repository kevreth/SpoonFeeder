import type { SlideInterface } from './slideInterface';

export abstract class SlideInitializer {
  constructor(public readonly type: string) { }
  public abstract instance(): SlideInterface;
}
