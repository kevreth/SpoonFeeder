import type { ResultReturnType } from './strategies/result';
export class SetValues<T> {
  constructor(
    public readonly saveData: () => void,
    public readonly result: () => ResultReturnType,
    public readonly setRes: (res: T) => void
  ) {}
}
